(function () {
  const container = document.getElementById('graph-container');
  if (!container) return;

  const width = container.clientWidth || 900;
  const height = container.clientHeight || 600;

  // Tufte palette
  const COLOR_NODE      = '#111111';
  const COLOR_NODE_HUB  = '#a00000'; // Tufte red for highly connected nodes
  const COLOR_LINK      = '#cccccc';
  const COLOR_LABEL     = '#111111';
  const COLOR_HOVER     = '#a00000';
  const NODE_MIN_R      = 4;
  const NODE_MAX_R      = 14;

  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  // Zoom layer
  const g = svg.append('g');

  svg.call(
    d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => g.attr('transform', event.transform))
  );

  fetch(window.GRAPH_DATA_URL || '/data/graph.json')
    .then(r => r.json())
    .then(data => render(data))
    .catch(() => {
      container.innerHTML = '<p style="padding:2rem;color:#999;">Graph data not found. Run <code>node scripts/export-graph.js</code> first.</p>';
    });

  function render(data) {
    const maxDegree = Math.max(...data.nodes.map(n => n.degree || 0), 1);

    const nodeRadius = d => {
      const deg = d.degree || 0;
      return NODE_MIN_R + ((deg / maxDegree) * (NODE_MAX_R - NODE_MIN_R));
    };

    const nodeColor = d => {
      if (d.id === 'German Hub') return COLOR_NODE_HUB;
      return (d.degree || 0) >= maxDegree * 0.5 ? COLOR_NODE_HUB : COLOR_NODE;
    };

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(60).strength(0.3))
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => nodeRadius(d) + 3));

    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', COLOR_LINK)
      .attr('stroke-width', 1);

    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', nodeRadius)
      .attr('fill', nodeColor)
      .attr('cursor', 'pointer')
      .call(drag(simulation));

    // Tooltip label
    const label = svg.append('text')
      .attr('class', 'graph-label')
      .style('pointer-events', 'none')
      .style('font-family', 'et-book, Palatino, serif')
      .style('font-size', '13px')
      .style('fill', COLOR_LABEL)
      .style('opacity', 0);

    node.on('mouseover', function (event, d) {
      d3.select(this).attr('fill', COLOR_HOVER);
      label
        .text(d.id)
        .attr('x', event.offsetX + 10)
        .attr('y', event.offsetY - 6)
        .style('opacity', 1);
    }).on('mousemove', function (event) {
      label
        .attr('x', event.offsetX + 10)
        .attr('y', event.offsetY - 6);
    }).on('mouseout', function (event, d) {
      d3.select(this).attr('fill', nodeColor);
      label.style('opacity', 0);
    });

    // Show labels permanently for hub nodes (top 10% by degree)
    const hubThreshold = maxDegree * 0.6;
    g.append('g')
      .attr('class', 'hub-labels')
      .selectAll('text')
      .data(data.nodes.filter(n => (n.degree || 0) >= hubThreshold))
      .join('text')
      .text(d => d.id)
      .attr('font-family', 'et-book, Palatino, serif')
      .attr('font-size', '11px')
      .attr('fill', COLOR_LABEL)
      .attr('dx', d => nodeRadius(d) + 3)
      .attr('dy', '0.35em')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      g.selectAll('.hub-labels text')
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  }

  function drag(simulation) {
    return d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  }
})();
