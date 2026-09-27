/* ================================================
   VUTV ReadyReserve — Interactive Prototype Engine
   ================================================ */

// State
let currentScreen = 'home';
let currentTab = 'home';
let lastUpdated = 'just now';

// Booking State
let myBookings = [
  { ref: '#VR-2026-0924-007', eq: 'Rode NTG3 Shotgun Mic', date: 'Thu, Sep 24', time: '2:00–4:00 PM', loc: 'Equipment Room A · Cabinet 2', status: 'confirmed' },
  { ref: '#VR-2026-0912-003', eq: 'Manfrotto Tripod', date: 'Sat, Sep 12', time: '10:00 AM–12:00 PM', loc: 'N/A', status: 'completed' }
];

let activeSearch = '';
let activeFilter = 'All';

// Equipment Data
const equipment = [
  { id: 'cam1', name: 'Sony A7III Camera', sub: 'Camera · Body only · #CAM-014', cls: 'cam', img: 'assets/sony-a7iii.jpg', tags: ['avail','ready'], target: 'detail', cat: 'Cameras' },
  { id: 'mic1', name: 'Rode NTG3 Shotgun Mic', sub: 'Audio · Boom-mount · #AUD-007', cls: 'aud', img: 'assets/rode-ntg3.jpg', tags: ['avail','ready'], target: 'detail', cat: 'Audio' },
  { id: 'tri1', name: 'Manfrotto Tripod', sub: 'Support · Fluid head · #TRP-003', cls: 'sup', img: null, tags: ['used','warn'], target: 'detail', cat: 'Support' },
  { id: 'lite1', name: 'Aputure 120D Light', sub: 'Lighting · LED · #LGT-002', cls: 'lite', img: 'assets/aputure-120d.jpg', tags: ['inuse'], target: 'detail', cat: 'Lighting' },
  { id: 'rec1', name: 'Zoom H6 Recorder', sub: 'Audio · Field recorder · #AUD-012', cls: 'gray', img: null, tags: ['repair'], target: 'detail', cat: 'Audio' }
];

const $ = id => document.getElementById(id);
const app = () => $('app');

function go(screen) {
  if (screen === 'browse' && currentScreen !== 'loading' && currentScreen !== 'detail' && currentScreen !== 'noresults') {
    currentScreen = 'loading';
    render();
    app().scrollTop = 0;
    setTimeout(() => {
      currentScreen = 'browse';
      render();
      app().scrollTop = 0;
    }, 800);
    return;
  }
  
  currentScreen = screen;
  render();
  app().scrollTop = 0;
}

function setTab(tab) {
  currentTab = tab;
  if (tab === 'browse') {
    go('browse');
  } else {
    go(tab);
  }
}

// Global Actions
window.updateRefresh = () => {
  const d = new Date();
  lastUpdated = String(d.getHours() % 12 || 12) + ':' + String(d.getMinutes()).padStart(2,'0') + (d.getHours() >= 12 ? ' PM' : ' AM');
  if(currentScreen === 'home') render();
};

window.doSearch = (val) => {
  activeSearch = val;
  if(currentScreen === 'browse') render();
};

window.doFilter = (val) => {
  activeFilter = val;
  if(currentScreen === 'browse') render();
};

window.confirmBooking = () => {
  myBookings.unshift({
    ref: '#VR-2026-0921-014',
    eq: 'Sony A7III Camera',
    date: 'Mon, Sep 21',
    time: '9:00–11:00 AM',
    loc: 'Equipment Room B · Shelf 3',
    status: 'confirmed',
    id: Date.now()
  });
  go('success');
};

window.cancelBooking = (id) => {
  myBookings = myBookings.filter(b => b.id !== id && b.ref !== id);
  if(currentScreen === 'mybookings') render();
};

// Screen builders
const screens = {};

/* ---- HOME ---- */
screens.home = () => {
  let h = '';
  h += '<div class="app-header"><h1>Home</h1><button class="app-icon-btn" onclick="updateRefresh()">⟳</button></div>';
  h += '<div class="app-body">';

  // Welcome
  h += '<div class="app-h2">VUTV Equipment</div>';
  h += '<p class="app-lead">Check shared equipment availability and plan your shoot.</p>';

  // Hero card
  h += '<button class="app-hero" data-go="browse">';
  h += '<div class="h-top"><span class="h-name">ReadyReserve</span><span class="chip"><span class="tag-dot" style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#4ADE80;margin-right:3px"></span> Live</span></div>';
  h += '<div class="h-big">5 Items Available</div>';
  h += '<div class="h-sub">3 in use · 1 needs repair · Updated ' + lastUpdated + '</div>';
  h += '</button>';

  // Dual actions
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
  h += '<button class="app-btn primary" data-go="browse">🔍 Browse Equipment</button>';
  h += '<button class="app-btn ghost" data-go="calendar_direct">📅 Find a Time Slot</button>';
  h += '</div>';

  // Quick stats
  h += '<div style="display:flex;gap:8px">';
  h += '<div style="flex:1;background:var(--navy-lt);border-radius:var(--r);padding:12px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--navy)">5</div><div style="font-size:10px;color:var(--sub);margin-top:2px">Available</div></div>';
  h += '<div style="flex:1;background:var(--red-lt);border-radius:var(--r);padding:12px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--red)">3</div><div style="font-size:10px;color:var(--sub);margin-top:2px">In Use</div></div>';
  h += '<div style="flex:1;background:var(--green-lt);border-radius:var(--r);padding:12px;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--green)">24h</div><div style="font-size:10px;color:var(--sub);margin-top:2px">Advance</div></div>';
  h += '</div>';

  h += '</div>'; // body
  h += tabs();
  return h;
};

/* ---- LOADING ---- */
screens.loading = () => {
  let h = '<div class="app-header"><h1>Equipment</h1></div>';
  h += '<div class="app-body">';
  h += '<div class="skel" style="height:42px;border-radius:12px;margin-bottom:4px"></div>';
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><div class="spinner"></div><span style="font-size:12px;color:var(--faint)">Checking live availability...</span></div>';
  for (let i = 0; i < 4; i++) {
    h += '<div class="skel-card" style="animation-delay:' + (i*0.15) + 's"><div class="skel-thumb skel"></div><div class="skel-lines"><div class="skel-line skel" style="width:' + (80-i*10) + '%"></div><div class="skel-line skel" style="width:' + (50-i*5) + '%"></div></div></div>';
  }
  h += '</div>';
  return h;
};

/* ---- BROWSE ---- */
screens.browse = () => {
  let h = '<div class="app-header"><button class="app-back" data-go="home">‹</button><h1>Equipment</h1><button class="app-icon-btn">≡</button></div>';
  h += '<div class="app-body">';

  // Search
  h += '<div class="app-search"><span class="s-icon">🔍</span><input type="text" id="searchInput" placeholder="Search equipment..." value="'+activeSearch+'" oninput="doSearch(this.value)"></div>';

  // Pills
  const cats = ['All', '📷 Cameras', '🎙 Audio', '☀ Lighting', 'Support'];
  h += '<div class="pills">';
  cats.forEach(c => {
    let raw = c.replace(/[^a-zA-Z]/g, '').trim();
    if(c==='All') raw = 'All';
    const isAct = activeFilter === raw;
    h += '<button class="pill-btn ' + (isAct?'on':'') + '" onclick="doFilter(\''+raw+'\')">' + c + '</button>';
  });
  h += '</div>';

  let filtered = equipment.filter(e => {
    if (activeFilter !== 'All' && e.cat !== activeFilter) return false;
    if (activeSearch && !e.name.toLowerCase().includes(activeSearch.toLowerCase()) && !e.cat.toLowerCase().includes(activeSearch.toLowerCase())) return false;
    return true;
  });

  if (filtered.length > 0) {
    h += '<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:13px;font-weight:700;color:var(--ink)">Available now</span><span style="font-size:12px;color:var(--sub)">'+filtered.length+' items</span></div>';
    filtered.forEach(e => {
      h += eqRow(e.name, e.sub, e.cls, e.img, e.tags, e.target);
    });
  } else {
    h += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;margin-top:40px">';
    h += '<div class="empty-icon">⊘</div>';
    h += '<div class="app-h2" style="font-size:18px">No equipment found</div>';
    h += '<p style="font-size:13px;color:var(--sub);line-height:1.6">We couldn\'t find gear matching <strong>"'+activeSearch+'"</strong>. Try a different keyword or browse by category.</p>';
    h += '<button class="app-btn primary" style="max-width:240px" onclick="doSearch(\'\')">Clear Search</button>';
    h += '</div>';
  }

  h += '</div>';
  h += tabs();
  
  // Refocus input if searching
  setTimeout(() => {
    let inp = $('searchInput');
    if(inp && activeSearch) {
      inp.focus();
      inp.setSelectionRange(inp.value.length, inp.value.length);
    }
  }, 10);
  
  return h;
};

function eqRow(name, sub, cls, img, tags, target) {
  const tagMap = {
    avail: '<span class="tag tag-avail"><span class="tag-dot"></span>Available</span>',
    ready: '<span class="tag tag-ready">✓ Ready</span>',
    used: '<span class="tag tag-used">Used Just Now</span>',
    warn: '<span class="tag tag-warn">⚠ Check condition</span>',
    inuse: '<span class="tag tag-inuse">In use until 5:00 PM</span>',
    repair: '<span class="tag tag-repair">⚠ Needs repair</span>',
  };
  let imgHtml = img ? '<img src="'+img+'" onerror="this.style.display=\'none\'">' : '';
  return '<button class="eq-row" data-go="'+target+'">' +
    '<div class="eq-thumb '+cls+'">'+imgHtml+'</div>' +
    '<div class="eq-main"><div class="eq-name">'+name+'</div><div class="eq-sub">'+sub+'</div>' +
    '<div class="eq-tags">' + tags.map(t=>tagMap[t]).join('') + '</div></div>' +
    '<span class="chev">›</span></button>';
}

/* ---- NO RESULTS (legacy unused, logic folded into browse) ---- */
screens.noresults = () => screens.browse();

/* ---- DETAIL ---- */
screens.detail = () => {
  let h = '<div class="app-header"><button class="app-back" data-go="browse">‹</button><h1>Equipment Detail</h1><button class="app-icon-btn">⊕</button></div>';
  h += '<div class="app-body">';

  // Hero
  h += '<div class="detail-hero"><img src="assets/sony-a7iii.jpg" alt="Sony A7III"><div class="detail-hero-badge"><span class="live-dot"></span> Available now</div></div>';

  // Title
  h += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
  h += '<div><div style="font-size:18px;font-weight:800;color:var(--ink);letter-spacing:-.4px">Sony A7III Camera</div><div style="font-size:11.5px;color:var(--sub);margin-top:2px">Camera · Body only · Asset #CAM-014</div></div>';
  h += '<div class="rating">★ 4.8</div>';
  h += '</div>';

  // Dual status
  h += '<div class="dual-status">';
  h += '<div class="st-card"><div class="st-icon avail">📅</div><div><div class="st-lbl">Availability</div><div class="st-val ok">Free until Mon 3:00 PM</div></div></div>';
  h += '<div class="st-card"><div class="st-icon ready">✓</div><div><div class="st-lbl">Readiness</div><div class="st-val ok">Shoot-ready</div></div></div>';
  h += '</div>';

  // Detail table
  h += '<div class="dtable">';
  h += '<div class="drow"><span class="drow-k">Condition</span><span class="drow-v">Good · Last serviced 12 Aug</span></div>';
  h += '<div class="drow"><span class="drow-k">Location</span><span class="drow-v">Equipment Room B · Shelf 3</span></div>';
  h += '<div class="drow"><span class="drow-k">Battery</span><span class="drow-v"><span class="bat-bar"><span class="bat-fill" style="width:78%"></span></span> 78% charged</span></div>';
  h += '<div class="drow"><span class="drow-k">Last checked</span><span class="drow-v">Today · 8:45 AM</span></div>';
  h += '<div class="drow"><span class="drow-k">Next booking</span><span class="drow-v">Mon, Sep 21 · 3:00 PM</span></div>';
  h += '</div>';

  h += '<button class="app-btn primary" data-go="calendar">📅 Book this equipment</button>';
  h += '</div>';
  return h;
};

/* ---- CALENDAR ---- */
screens.calendar = () => {
  let h = '<div class="app-header"><button class="app-back" data-go="detail">‹</button><h1>Select Date & Time</h1></div>';
  h += '<div class="app-body">';

  h += '<div class="context-chip">📷 Sony A7III Camera</div>';

  // Calendar
  h += '<div class="app-card" style="padding:14px">';
  h += '<div class="cal-head"><button class="cal-nav">‹</button><span class="cal-month">September 2026</span><button class="cal-nav">›</button></div>';
  h += '<div class="cal-grid">';
  'S M T W T F S'.split(' ').forEach(d => h += '<div class="cal-lbl">'+d+'</div>');
  h += '<div class="cal-d empty"></div>'; // Sep 1st is Tuesday? No, if 21 is Monday, 1st is Tuesday.
  // Actually, if 21 is Monday, 20 is Sun, 13 Sun, 6 Sun. So 1 is Tuesday. Wait, we can just render the numbers.
  h += '<div class="cal-d empty"></div><div class="cal-d empty"></div>'; // Offset
  for (let i = 1; i <= 30; i++) {
    h += '<div class="cal-d' + (i===21?' sel':'') + '" data-calday="'+i+'">' + i + '</div>';
  }
  h += '</div></div>';

  // Slots
  h += '<div style="font-size:12px;font-weight:700;color:var(--ink)">Available slots — Mon, Sep 21</div>';
  h += '<div class="slot avail" data-go="confirm"><div class="slot-time">9:00 AM – 11:00 AM</div><span class="slot-badge slot-free">Select</span></div>';
  h += '<div class="slot taken"><div class="slot-time">11:00 AM – 1:00 PM</div><span class="slot-badge slot-taken-b">Booked</span></div>';
  h += '<div class="slot avail" data-go="confirm"><div class="slot-time">1:00 PM – 3:00 PM</div><span class="slot-badge slot-free">Select</span></div>';
  
  // CONFLICT SLOT: visually available but triggers conflict
  h += '<div class="slot avail" data-go="conflict"><div class="slot-time">3:00 PM – 5:00 PM</div><span class="slot-badge slot-free">Select</span></div>';

  h += '<button class="app-btn quiet" data-go="browse">Cancel booking</button>';
  h += '</div>';
  return h;
};

screens.calendar_direct = screens.calendar; // alias

/* ---- CONFIRM ---- */
screens.confirm = () => {
  let h = '<div class="app-header"><button class="app-back" data-go="calendar">‹</button><h1>Review Booking</h1></div>';
  h += '<div class="app-body">';

  h += '<div style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;color:var(--navy)">📋 Review your booking</div>';

  h += '<div class="conf-card">';
  h += '<div class="conf-row"><span class="conf-k">Equipment</span><span class="conf-v bold">Sony A7III Camera</span></div>';
  h += '<div class="conf-div"></div>';
  h += '<div class="conf-row"><span class="conf-k">Date</span><span class="conf-v">Monday, Sep 21, 2026</span></div>';
  h += '<div class="conf-row"><span class="conf-k">Time slot</span><span class="conf-v">9:00 AM – 11:00 AM</span></div>';
  h += '<div class="conf-row"><span class="conf-k">Booked for</span><span class="conf-v">VUTV · Podcast recording</span></div>';
  h += '<div class="conf-div"></div>';
  h += '<div class="conf-row"><span class="conf-k">Readiness</span><span class="conf-v ok">✓ Shoot-ready</span></div>';
  h += '<div class="conf-row"><span class="conf-k">Pickup</span><span class="conf-v">Equipment Room B, Shelf 3</span></div>';
  h += '<div class="conf-row"><span class="conf-k">Conflict check</span><span class="conf-v ok">✓ No conflicts</span></div>';
  h += '</div>';

  h += '<div class="notice">⚠ This slot will be reserved immediately and removed from other producers\' availability.</div>';

  h += '<button class="app-btn primary-green" onclick="confirmBooking()">Confirm Booking</button>';
  h += '<button class="app-btn quiet" data-go="calendar">Go back and edit</button>';
  h += '</div>';
  return h;
};

/* ---- SUCCESS ---- */
screens.success = () => {
  let h = '<div class="app-header"><h1>Booking Confirmed</h1></div>';
  h += '<div class="success-center">';

  h += '<div class="success-icon">✓</div>';
  h += '<div class="app-h2" style="font-size:20px">Booking Confirmed!</div>';
  h += '<p style="font-size:13px;color:var(--sub);line-height:1.6">Sony A7III Camera is reserved for you on<br><strong>Mon, Sep 21 · 9:00 – 11:00 AM</strong></p>';

  h += '<div class="ref-card"><div class="ref-lbl">Booking Reference</div><div class="ref-code">#VR-2026-0921-014</div><div class="ref-sub">Equipment Room B · Shelf 3</div></div>';

  h += '<div style="width:100%;display:flex;flex-direction:column;gap:8px">';
  h += '<button class="app-btn primary" data-go="mybookings">📅 View My Bookings</button>';
  h += '<button class="app-btn ghost" data-go="home">Back to Home</button>';
  h += '</div>';
  h += '</div>';
  return h;
};

/* ---- CONFLICT ---- */
screens.conflict = () => {
  let h = '<div class="app-header"><button class="app-back" data-go="calendar">‹</button><h1>Select Date & Time</h1></div>';
  h += '<div class="app-body">';

  h += '<div class="conflict-icon">⚠</div>';
  h += '<div class="app-h2" style="text-align:center;font-size:18px">This slot was just booked</div>';
  h += '<p style="font-size:12.5px;color:var(--sub);text-align:center;line-height:1.6">Someone else reserved <strong>3:00–5:00 PM</strong> a moment ago. Your other selections are still saved — pick a different slot below.</p>';

  h += '<div class="preserved"><div class="preserved-lbl">Your saved selections</div><div class="preserved-row">📷 Sony A7III Camera</div><div class="preserved-row">📅 Monday, Sep 21, 2026</div></div>';

  h += '<div style="font-size:12px;font-weight:700;color:var(--ink)">Available alternatives</div>';
  h += '<div class="slot avail" data-go="confirm"><div class="slot-time">9:00 AM – 11:00 AM</div><span class="slot-badge slot-free">Select</span></div>';
  h += '<div class="slot avail" data-go="confirm"><div class="slot-time">1:00 PM – 3:00 PM</div><span class="slot-badge slot-free">Select</span></div>';

  h += '<button class="app-btn ghost" data-go="browse">Cancel & return to equipment</button>';
  h += '</div>';
  return h;
};

/* ---- MY BOOKINGS ---- */
screens.mybookings = () => {
  let h = '<div class="app-header"><button class="app-back" data-go="home">‹</button><h1>My Bookings</h1></div>';
  h += '<div class="app-body">';

  let upcoming = myBookings.filter(b => b.status === 'confirmed');
  let past = myBookings.filter(b => b.status === 'completed');

  h += '<p class="app-label">Upcoming</p>';
  if (upcoming.length === 0) {
    h += '<p style="font-size:13px;color:var(--sub);padding:10px 0;">No upcoming bookings.</p>';
  } else {
    upcoming.forEach(b => {
      h += '<div class="bk-card" style="margin-bottom:8px;flex-direction:column;cursor:default;">';
      h += '<div style="display:flex;">';
      h += '<div class="bk-accent g"></div><div class="bk-body"><div class="bk-top"><span class="bk-pill confirmed">Confirmed</span><span class="bk-ref">'+b.ref+'</span></div><div class="bk-name">'+b.eq+'</div><div class="bk-when">'+b.date+' · '+b.time+'</div><div class="bk-where">📍 '+b.loc+'</div></div>';
      h += '</div>';
      h += '<div style="padding:10px 14px;border-top:1px solid var(--line);text-align:right;">';
      let bid = b.id || b.ref;
      h += '<button class="app-btn danger" style="padding:6px 12px;width:auto;" onclick="cancelBooking(\''+bid+'\')">Cancel</button>';
      h += '</div></div>';
    });
  }

  h += '<p class="app-label" style="margin-top:8px">Past</p>';
  past.forEach(b => {
    h += '<div class="bk-card" style="opacity:.6;margin-bottom:8px;cursor:default;"><div class="bk-accent gr"></div><div class="bk-body"><div class="bk-top"><span class="bk-pill completed">Completed</span><span class="bk-ref">'+b.ref+'</span></div><div class="bk-name">'+b.eq+'</div><div class="bk-when">'+b.date+' · '+b.time+'</div></div></div>';
  });

  h += '</div>';
  h += tabs();
  return h;
};

function tabs() {
  const t = [['home','⌂','Home'],['browse','🔍','Equipment'],['calendar_direct','📅','Schedule'],['mybookings','👤','Bookings']];
  return '<div class="app-tabs">' + t.map(x =>
    '<button class="' + (currentTab === x[0] ? 'on' : '') + '" data-tab="' + x[0] + '">' +
    '<span class="ic">' + x[1] + '</span>' + x[2] + '</button>').join('') + '</div>';
}

/* ---- RENDER ---- */
function render() {
  const fn = screens[currentScreen] || screens.home;
  app().innerHTML = fn();
}

/* ---- EVENTS ---- */
document.addEventListener('click', ev => {
  const goEl = ev.target.closest('[data-go]');
  if (goEl) {
    go(goEl.dataset.go);
    return;
  }
  const tabEl = ev.target.closest('[data-tab]');
  if (tabEl) {
    setTab(tabEl.dataset.tab);
    return;
  }
  const calEl = ev.target.closest('[data-calday]');
  if (calEl) {
    calEl.closest('.cal-grid').querySelectorAll('.cal-d').forEach(d => d.classList.remove('sel'));
    calEl.classList.add('sel');
    return;
  }
});

/* ---- CLOCK ---- */
function clock() {
  const el = $('clock');
  if (!el) return;
  const d = new Date(), h = d.getHours() % 12 || 12;
  el.textContent = h + ':' + String(d.getMinutes()).padStart(2,'0');
}
clock(); setInterval(clock, 20000);

/* ---- FIT PHONE ---- */
function fit() {
  if (window.innerWidth <= 560) return;
  const k = Math.min((window.innerHeight - 80) / 2694, (window.innerWidth - 80) / 1278);
  document.documentElement.style.setProperty('--k', k);
}
window.addEventListener('resize', fit);
fit();

/* ---- BOOT ---- */
render();
