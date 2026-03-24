(function () {
  const container = document.getElementById('graph-mini-container');
  if (!container) return;

  const width = container.clientWidth || 700;
  const height = 560;

  const COLOR_NODE     = '#111111';
  const COLOR_NODE_HUB = '#a00000';
  const COLOR_LINK     = '#cccccc';
  const COLOR_LABEL    = '#111111';
  const COLOR_HOVER    = '#a00000';
  const NODE_MIN_R     = 3;
  const NODE_MAX_R     = 18;

  const svg = d3.select('#graph-mini-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const g = svg.append('g');

  svg.call(
    d3.zoom()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => g.attr('transform', event.transform))
  );

  fetch(window.GRAPH_DATA_URL || '/data/graph.json')
    .then(r => r.json())
    .then(data => render(data))
    .catch(() => {
      container.innerHTML = '<p style="padding:1rem;color:#999;font-size:0.85rem;">Graph unavailable.</p>';
    });

  function render(data) {
    const maxDegree = Math.max(...data.nodes.map(n => n.degree || 0), 1);
    const colorThreshold = maxDegree * 0.5;
    const hubThreshold   = maxDegree * 0.6;

    const nodeColor = d => {
      if (d.id === 'German Hub') return COLOR_NODE_HUB;
      return (d.degree || 0) >= colorThreshold ? COLOR_NODE_HUB : COLOR_NODE;
    };

    const nodeRadius = d => {
      const deg = d.degree || 0;
      return NODE_MIN_R + (Math.pow(deg / maxDegree, 1.8) * (NODE_MAX_R - NODE_MIN_R));
    };

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(40).strength(0.3))
      .force('charge', d3.forceManyBody().strength(-60))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => nodeRadius(d) + 2));

    g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', COLOR_LINK)
      .attr('stroke-width', 0.8);

    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', nodeRadius)
      .attr('fill', nodeColor)
      .attr('cursor', 'pointer')
      .call(drag(simulation));

    const label = svg.append('text')
      .style('pointer-events', 'none')
      .style('font-family', 'et-book, Palatino, serif')
      .style('font-size', '12px')
      .style('fill', COLOR_LABEL)
      .style('opacity', 0);

    node.on('mouseover', function (event, d) {
      d3.select(this).attr('fill', COLOR_HOVER);
      label.text(d.id)
        .attr('x', event.offsetX + 10)
        .attr('y', event.offsetY - 6)
        .style('opacity', 1);
    }).on('mousemove', function (event) {
      label.attr('x', event.offsetX + 10).attr('y', event.offsetY - 6);
    }).on('mouseout', function (event, d) {
      d3.select(this).attr('fill', nodeColor(d));
      label.style('opacity', 0);
    });

    g.append('g')
      .attr('class', 'hub-labels')
      .selectAll('text')
      .data(data.nodes.filter(n => (n.degree || 0) >= hubThreshold))
      .join('text')
      .text(d => d.id)
      .attr('font-family', 'et-book, Palatino, serif')
      .attr('font-size', '10px')
      .attr('fill', COLOR_LABEL)
      .attr('dx', d => nodeRadius(d) + 2)
      .attr('dy', '0.35em')
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      g.selectAll('.links line')
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);

      g.selectAll('.nodes circle')
        .attr('cx', d => d.x).attr('cy', d => d.y);

      g.selectAll('.hub-labels text')
        .attr('x', d => d.x).attr('y', d => d.y);
    });
  }

  function drag(simulation) {
    return d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
      });
  }
})();
