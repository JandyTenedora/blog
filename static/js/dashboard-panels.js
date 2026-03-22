(function () {
  var url = window.TASKS_DATA_URL || '/data/tasks.json';

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function (e) { console.error('dashboard-panels:', e); });

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function fmtDate(iso) {
    var parts = iso.split('-');
    var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function render(data) {
    renderToday(data.today);
    renderMissed(data.missed);
  }

  function renderToday(today) {
    var el = document.getElementById('dp-today');
    if (!el) return;

    if (!today) {
      el.innerHTML = '<div class="dp-empty">No study plan found.</div>';
      return;
    }

    var html = ['<div class="dp-panel">'];
    html.push('<div class="dp-panel-header">');
    html.push('<span class="dp-panel-title">Today\'s plan</span>');
    html.push('<span class="dp-panel-date">' + fmtDate(today.date) + '</span>');
    html.push('</div>');

    if (today.focus) {
      html.push('<div class="dp-focus">' + escapeHtml(today.focus) + '</div>');
    }

    if (today.sections && today.sections.length > 0) {
      today.sections.forEach(function (section) {
        html.push('<div class="dp-section">');
        html.push('<div class="dp-section-name">' + escapeHtml(section.name) + '</div>');
        section.tasks.forEach(function (task) {
          var cls = 'dp-task' + (task.done ? ' dp-task-done' : '');
          html.push('<div class="' + cls + '">');
          html.push('<span class="dp-checkbox">' + (task.done ? '✓' : '○') + '</span>');
          html.push('<span class="dp-task-title">' + escapeHtml(task.title) + '</span>');
          if (task.duration) {
            html.push('<span class="dp-duration">' + escapeHtml(task.duration) + '</span>');
          }
          html.push('</div>');
        });
        html.push('</div>');
      });
    } else {
      html.push('<div class="dp-empty">No tasks scheduled.</div>');
    }

    html.push('</div>');
    el.innerHTML = html.join('');
  }

  function renderMissed(missed) {
    var el = document.getElementById('dp-missed');
    if (!el) return;

    if (!missed || missed.length === 0) {
      el.innerHTML = '<div class="dp-panel"><div class="dp-panel-header"><span class="dp-panel-title">Missed tasks</span></div><div class="dp-empty">All clear.</div></div>';
      return;
    }

    var html = ['<div class="dp-panel">'];
    html.push('<div class="dp-panel-header">');
    html.push('<span class="dp-panel-title">Missed tasks</span>');
    html.push('</div>');

    missed.forEach(function (entry) {
      html.push('<div class="dp-section">');
      html.push('<div class="dp-section-name">' + fmtDate(entry.date) + '</div>');
      entry.tasks.forEach(function (task) {
        html.push('<div class="dp-task dp-task-missed">');
        html.push('<span class="dp-checkbox">○</span>');
        html.push('<span class="dp-task-title">' + escapeHtml(task.title) + '</span>');
        if (task.duration) {
          html.push('<span class="dp-duration">' + escapeHtml(task.duration) + '</span>');
        }
        html.push('</div>');
      });
      html.push('</div>');
    });

    html.push('</div>');
    el.innerHTML = html.join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
