(function () {
  var url = window.HABITS_DATA_URL || '/data/habits.json';

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function (e) { console.error('habit-calendar:', e); });

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DAYS   = ['M','T','W','T','F','S','S'];

  function toISO(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function mondayOf(d) {
    var clone = new Date(d);
    var dow = clone.getDay(); // 0=Sun
    var back = (dow === 0) ? 6 : dow - 1;
    clone.setDate(clone.getDate() - back);
    clone.setHours(0, 0, 0, 0);
    return clone;
  }

  function render(data) {
    var el = document.getElementById('habit-calendar');
    if (!el) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find earliest date in the data so the calendar starts there
    var allDates = [];
    data.habits.forEach(function (h) {
      (data.done[h.id] || []).forEach(function (iso) { allDates.push(iso); });
    });
    allDates.sort();

    var startMonday;
    if (allDates.length > 0) {
      startMonday = mondayOf(new Date(allDates[0]));
    } else {
      // Default: 16 weeks back
      startMonday = mondayOf(today);
      startMonday.setDate(startMonday.getDate() - 15 * 7);
    }

    // Build full weeks from startMonday through the Sunday >= today
    var weeks = [];
    var d = new Date(startMonday);
    while (true) {
      var week = [];
      for (var i = 0; i < 7; i++) {
        week.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      weeks.push(week);
      // Stop after the week that contains today
      if (week[6] >= today) break;
    }

    // Build done sets
    var doneSets = {};
    data.habits.forEach(function (h) {
      var set = {};
      (data.done[h.id] || []).forEach(function (iso) { set[iso] = true; });
      doneSets[h.id] = set;
    });

    var CELL = 12;  // px
    var GAP  = 3;   // px

    // Compute streak for each habit
    function currentStreak(habit) {
      var streak = 0;
      var check = new Date(today);
      // If today isn't done yet, start from yesterday
      var todayISO = toISO(today);
      if (!doneSets[habit.id][todayISO]) {
        check.setDate(check.getDate() - 1);
      }
      while (true) {
        if (doneSets[habit.id][toISO(check)]) {
          streak++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    }

    var html = ['<div class="hc-wrap">'];

    // Month labels row
    html.push('<div class="hc-header">');
    html.push('<div class="hc-spacer"></div>');
    var lastMonth = -1;
    weeks.forEach(function (week) {
      var m = week[0].getMonth();
      if (m !== lastMonth) {
        html.push('<div class="hc-col hc-month-lbl">' + MONTHS[m] + '</div>');
        lastMonth = m;
      } else {
        html.push('<div class="hc-col hc-month-lbl"></div>');
      }
    });
    html.push('</div>');

    // One row per habit
    data.habits.forEach(function (habit) {
      var streak = currentStreak(habit);
      var total  = Object.keys(doneSets[habit.id]).length;

      html.push('<div class="hc-row">');
      html.push(
        '<div class="hc-spacer">' +
        '<span class="hc-habit-name">' + habit.label + '</span>' +
        '<span class="hc-streak">' + streak + ' day streak</span>' +
        '</div>'
      );

      weeks.forEach(function (week) {
        html.push('<div class="hc-col hc-week">');
        week.forEach(function (day) {
          var iso     = toISO(day);
          var future  = day > today;
          var done    = !future && doneSets[habit.id][iso];
          var cls     = 'hc-cell';
          if (future)     cls += ' hc-future';
          else if (done)  cls += ' hc-done hc-' + habit.id;
          var label = DAYS[(day.getDay() + 6) % 7]; // Mon=0
          html.push('<div class="' + cls + '" title="' + iso + ' (' + label + ')"></div>');
        });
        html.push('</div>');
      });

      html.push('</div>'); // hc-row
    });

    // Legend + total
    html.push('<div class="hc-footer">');
    html.push('<span class="hc-legend-label">less</span>');
    html.push('<div class="hc-cell hc-legend-cell"></div>');
    data.habits.forEach(function (h) {
      html.push('<div class="hc-cell hc-done hc-' + h.id + ' hc-legend-cell" title="' + h.label + '"></div>');
    });
    html.push('<span class="hc-legend-label">more</span>');
    html.push('</div>');

    html.push('</div>'); // hc-wrap
    el.innerHTML = html.join('');
  }
})();
