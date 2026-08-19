// make-calendar.js — regenerates life-goals.ics from the dated goals in data.js.
// Run after editing goal dates:  node make-calendar.js
// If you host the dashboard online, the hosted life-goals.ics is what your
// calendar app can subscribe to (see README).
const fs = require('fs');
const path = require('path');

// If your dashboard is online (see README), put its address here, e.g.
// 'https://my-solar-system.pages.dev' — then planet/goal edits made in the
// page are included too. Leave '' to read data.js only.
const SITE_URL = '';

async function loadSystem(){
  // planet edits made in the page live in the cloud state and override data.js
  if (SITE_URL) {
    try {
      const res = await fetch(SITE_URL + '/api/state');
      const state = await res.json();
      if (state && state.__config && state.__config.areas && state.__config.areas.length){
        console.log('Using cloud config (planets were edited in the page)');
        return state.__config;
      }
    } catch (e) { /* offline — fall back to data.js */ }
  }
  const src = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
  return new Function(src + '\nreturn system;')();
}

const pad2 = n => String(n).padStart(2, '0');
const esc = s => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');

(async () => {
  const system = await loadSystem();
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Life Solar System//EN',
                 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:' + esc(system.title)];

  const items = [];
  system.areas.forEach(a => (a.goals || []).forEach(g => {
    if (g.due) items.push({ a, g, title: g.title, context: a.label, due: g.due });
    (g.subgoals || []).forEach(s => { if (s.due) items.push({ a, g, title: s.title, context: g.title, due: s.due }); });
  }));
  items.sort((x, y) => x.due.localeCompare(y.due));

  items.forEach(({ a, g, title, context, due }) => {
    const start = due.replace(/-/g, '');
    const d = new Date(due + 'T00:00:00');
    d.setDate(d.getDate() + 1); // all-day events end the following day
    const end = d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate());
    const uid = (a.label + '-' + g.title + '-' + title).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80) + '@life-solar-system';
    lines.push('BEGIN:VEVENT', 'UID:' + uid, 'DTSTAMP:' + start + 'T000000Z',
               'DTSTART;VALUE=DATE:' + start, 'DTEND;VALUE=DATE:' + end,
               'SUMMARY:' + esc(title + ' (' + context + ')'), 'END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  fs.writeFileSync(path.join(__dirname, 'life-goals.ics'), lines.join('\r\n') + '\r\n');
  console.log('Wrote life-goals.ics with ' + items.length + ' events');
})();
