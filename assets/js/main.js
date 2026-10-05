// Cijfers uit het logboek (tabel 5: start t/m ronde 8)
const DATA = {
  labels: ['Start', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'],
  loyaliteit: [52.4, 65.2, 67.9, 60.9, 55.1, 67.1, 67.6, 68.6, 67.5],
  tevredenheid: [54.5, 71.9, 73.4, 76.2, 76.8, 76.7, 72.2, 72.9, 75.2],
  verzuim: [4, 4, 7, 6, 4, 5, 4, 4, 4],
  kosten: [755, 1090, 1315, 1849, 1591, 1425, 1419, 1466, 1517],
  kpi: [5.5, 5.94, 5.7, 5.94, 5.37, 5.62, 5.03, 5.31, 4.95],
};

const WEIGHTS = [
  ['Rentabiliteit totaal vermogen', 20],
  ['Current ratio', 15],
  ['Marktaandeel', 15],
  ['Omzet', 15],
  ['Medewerkersloyaliteit', 15, true],
  ['MVO', 10],
  ['Marktkennis', 6],
  ['Innovatiegraad', 4],
];

// source: 'plan' = uit het plan, 'moment' = in het moment, 'mix' = uit de visie
const ROUNDS = [
  {
    season: 'Winter', title: 'Als eerste bewegen', source: 'plan',
    sourceText: 'Uit ons plan (aanbeveling 6)',
    chose: 'Het hele pakket in één ronde: salaris +3% en +2%, opleidingsbudget van 3/4/4 naar 7/7/8%, pensioen 9% volledig werkgever, vakantie- en werkplekpakket C, winstdeling 8 en alle drie de HRM-marktonderzoeken.',
    result: 'Tevredenheid +17,4 naar 71,9, loyaliteit +12,8 naar 65,2, bij € 334.458 hogere personeelskosten. Bedrijfsbreed gedeeld eerste in de pool en vierde van twintig.',
    adjust: 'Een totaalscore van 7,5 bleek onhaalbaar (de hoogste van alle twintig teams was 6,86). Nieuw doel: eerste in pool 5 en top drie landelijk.',
  },
  {
    season: 'Lente', title: 'De werkdruk oplossen', source: 'mix',
    sourceText: 'Uit onze visie, daarna vaste afspraak',
    chose: 'Twaalf productiemedewerkers geworven vóór de derde ploeg, salaris +4% en +3%, pensioenpremie van 9 naar 12.',
    result: 'De werkdruk zakte van 105% naar 62%, maar het verzuim liep op naar 7,0% en kostte 1.130.250 stuks productiecapaciteit. Mijn KPI zakte naar 5,70.',
    adjust: 'Alles wat zichtbaar is, wordt binnen twee ronden gekopieerd. Pensioen en winstdeling hield ik bewust achter de hand.',
  },
  {
    season: 'Zomer', title: 'Groeien zonder vraag', source: 'plan',
    sourceText: 'Uit het plan, met een misstap',
    chose: 'Pensioen naar 15 en winstdeling naar 10, allebei het hoogste van de pool. Salaris +5,5% en dertien mensen voor een vierde ploeg, omdat we op 24% marktgroei rekenden.',
    result: 'Die groei kwam er niet. Het bedrijf zakte van 5,96 naar 4,04, van plek 6 naar 17. We produceerden 16,5 miljoen stuks en verkochten er 8,9 miljoen. Mijn loyaliteit daalde 7,0 punten.',
    adjust: 'Ik dacht aan verdunning door nieuwe collega’s, maar Staf (−11,4) en Sales (−12,1) kregen niemand nieuw en zakten het hardst. Het was werkdruk, niet samenstelling.',
  },
  {
    season: 'Herfst', title: 'Bezuinigen onder druk', source: 'moment',
    sourceText: 'In het moment, tegen spelregel 9',
    chose: 'Pakket laten staan, maar na het directieoverleg van 10 september: opleiding naar 9/7/5%, salaris +3,5% in plaats van 5,5% en terug van vier naar drie ploegen. Twaalf ontslagen.',
    result: 'Verzuim 4,0% en tevredenheid 76,8, allebei het beste van het spel. Toch zakte mijn KPI naar 5,37 en ging ik van plek 5 naar 11.',
    adjust: 'Het prijskaartje: € 258.000 lagere kosten tegenover € 69.632 ontslagkosten en −7,2 loyaliteit bij Productie. Vanaf nu: geen ontslagen meer.',
  },
  {
    season: 'Winter', title: 'De krimp terugdraaien', source: 'plan',
    sourceText: 'Mijn eigen plan uit ronde 4',
    chose: 'Geen ontslagen, één medewerker erbij bij Sales, salaris +2,0% en het pakket onaangeroerd.',
    result: 'Loyaliteit van 55,1 naar 67,1: twaalf punten in één kwartaal, bij alle drie de afdelingen. Mijn KPI ging naar 5,62. De fabrieksbezetting ging van 37% naar 61%.',
    adjust: 'Het aantal ploegen is een gezamenlijke beslissing van productie en HR. Als team hielden we het personeelsbudget voortaan buiten de bezuinigingen, en de loyaliteit bleef daarna tussen 67 en 69.',
  },
  {
    season: 'Lente', title: 'De slechtste ronde', source: 'moment',
    sourceText: 'In het moment, buiten het plan',
    chose: 'Het team verdubbelde het deposito, verlaagde de productie met 44% en de resellermarge ging (door een typefout) naar 5%. Zelf: salaris +2–3%, opleiding naar 2% en Sales van vijf naar drie FTE.',
    result: 'Een nettoverlies van € 1,10 miljoen, totaalscore 3,55 en plek 19 van 20. Mijn loyaliteit steeg naar 67,6, maar mijn KPI zakte naar 5,03.',
    adjust: 'Op elke knop die de concurrentie kan zien stond ik onderaan. Daarna toetsten we elk besluit vooraf aan de tien beslisregels, en werd de productieopdracht het eerste besluit van de ronde.',
  },
  {
    season: 'Zomer', title: 'Terug naar het plan', source: 'plan',
    sourceText: 'Bewuste correctie, met het salarisonderzoek',
    chose: 'Salaris +5,5%, +6,0% en +5,0%, pensioen naar 17 en winstdeling naar 8. Bewust 96% werkdruk voor deze ene ronde, voor een volle bezetting.',
    result: 'De beste ronde van het bedrijf: omzet € 14,77 miljoen, nettowinst € 1,59 miljoen en een RTV-score van 1,00 naar 6,01. Verzuim bleef 4,0%.',
    adjust: 'Als er bezuinigd moet worden, dan niet tegelijk op mensen én op het pakket.',
  },
  {
    season: 'Herfst', title: 'Krimpen en investeren in wie blijft', source: 'plan',
    sourceText: 'Mijn plan uit ronde 7',
    chose: 'Een ploeg minder (productie van 40 naar 28 FTE), maar salaris +6,5% en het opleidingsbudget van € 15.447 naar € 35.957.',
    result: 'Evenveel ontslagen als in ronde 4, maar zes keer minder loyaliteitsschade. Tevredenheid omhoog naar 75,2. Van plek 19 naar 16.',
    adjust: 'Een schone balans achtergelaten: current ratio 6,20 en solvabiliteit 74,2%.',
  },
];

const nl = (n, d = 1) => n.toLocaleString('nl-NL', { minimumFractionDigits: d, maximumFractionDigits: d });
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- KPI-weging ---------- */
document.getElementById('weights').innerHTML = WEIGHTS.map(([name, w, mine]) => `
  <li class="${mine ? 'is-mine' : ''}">
    <span class="weights__name">${name}${mine ? ' <em>mijn KPI</em>' : ''}</span>
    <span class="weights__bar"><span style="--w:${w / 20}"></span></span>
    <span class="weights__val">${w}%</span>
  </li>`).join('');

/* ---------- Rondes ---------- */
const SOURCE_LABEL = { plan: 'Uit het plan', moment: 'In het moment', mix: 'Uit de visie' };
document.getElementById('steps').innerHTML = ROUNDS.map((r, i) => `
  <li class="step" data-index="${i + 1}">
    <p class="step__meta">Ronde ${i + 1}, ${r.season}</p>
    <h3 class="step__title">${r.title}</h3>
    <p class="tag tag--${r.source}" title="${SOURCE_LABEL[r.source]}"><span aria-hidden="true"></span>${r.sourceText}</p>
    <dl class="step__body">
      <div><dt>Gekozen</dt><dd>${r.chose}</dd></div>
      <div><dt>Resultaat</dt><dd>${r.result}</dd></div>
      <div><dt>Bijgesteld</dt><dd>${r.adjust}</dd></div>
    </dl>
  </li>`).join('');

/* ---------- Grafiek ---------- */
const SVG_NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs, parent) => {
  const n = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
};

function makeChart(svg, { w, h, pad, min, max, series, ticks }) {
  const xs = i => pad.l + (i * (w - pad.l - pad.r)) / (DATA.labels.length - 1);
  const ys = v => pad.t + ((max - v) * (h - pad.t - pad.b)) / (max - min);
  const grid = el('g', { class: 'grid' }, svg);
  ticks.forEach(t => {
    el('line', { x1: pad.l, x2: w - pad.r, y1: ys(t), y2: ys(t) }, grid);
    const tx = el('text', { x: pad.l - 8, y: ys(t) + 4, 'text-anchor': 'end' }, grid);
    tx.textContent = nl(t, t % 1 ? 1 : 0);
  });
  if (pad.b > 10) DATA.labels.forEach((l, i) => {
    const tx = el('text', { x: xs(i), y: h - 6, 'text-anchor': 'middle', class: 'xl' }, grid);
    tx.textContent = l;
  });
  const marker = el('line', { class: 'marker', x1: xs(0), x2: xs(0), y1: pad.t, y2: h - pad.b }, svg);
  const lines = series.map(({ key, cls }) => {
    const pts = DATA[key].map((v, i) => `${xs(i)},${ys(v)}`).join(' ');
    el('polyline', { class: `ghost ${cls}`, points: pts }, svg);
    const line = el('polyline', { class: `line ${cls}`, points: pts }, svg);
    const dot = el('circle', { class: `dot ${cls}`, r: 6, cx: xs(0), cy: ys(DATA[key][0]) }, svg);
    return { key, line, dot };
  });
  // cumulatieve lengte per punt, zodat de lijn precies tot de huidige ronde getekend wordt
  lines.forEach(o => {
    o.cum = [0];
    DATA[o.key].forEach((v, i) => {
      if (!i) return;
      const dx = xs(i) - xs(i - 1), dy = ys(v) - ys(DATA[o.key][i - 1]);
      o.cum.push(o.cum[i - 1] + Math.hypot(dx, dy));
    });
    o.len = o.cum[o.cum.length - 1];
    o.line.style.strokeDasharray = `${o.len} ${o.len}`;
  });
  return idx => {
    marker.setAttribute('x1', xs(idx));
    marker.setAttribute('x2', xs(idx));
    lines.forEach(o => {
      o.line.style.strokeDashoffset = o.len - o.cum[idx];
      o.dot.setAttribute('cx', xs(idx));
      o.dot.setAttribute('cy', ys(DATA[o.key][idx]));
    });
  };
}

const setMain = makeChart(document.getElementById('chart-main'), {
  w: 520, h: 260, pad: { l: 40, r: 14, t: 14, b: 30 }, min: 50, max: 80,
  ticks: [50, 60, 70, 80],
  series: [{ key: 'loyaliteit', cls: 'loy' }, { key: 'tevredenheid', cls: 'sat' }],
});
const setKpi = makeChart(document.getElementById('chart-kpi-line'), {
  w: 520, h: 90, pad: { l: 40, r: 14, t: 10, b: 10 }, min: 4.5, max: 6.5,
  ticks: [5, 6],
  series: [{ key: 'kpi', cls: 'kpi' }],
});
// startlijn 5,50 in de KPI-grafiek
(() => {
  const svg = document.getElementById('chart-kpi-line');
  const y = 10 + ((6.5 - 5.5) * 70) / 2;
  el('line', { class: 'baseline', x1: 40, x2: 506, y1: y, y2: y }, svg);
})();

const roundEl = document.getElementById('chart-round');
const kpiEl = document.getElementById('chart-kpi');
const verzuimEl = document.getElementById('st-verzuim');
const kostenEl = document.getElementById('st-kosten');

let current = -1;
function setRound(idx) {
  if (idx === current) return;
  current = idx;
  setMain(idx);
  setKpi(idx);
  roundEl.textContent = idx === 0 ? 'Start' : `Ronde ${idx}`;
  if (!reduceMotion) {
    roundEl.classList.remove('is-flip');
    void roundEl.offsetWidth;
    roundEl.classList.add('is-flip');
  }
  kpiEl.textContent = nl(DATA.kpi[idx], 2);
  verzuimEl.textContent = `${nl(DATA.verzuim[idx])}%`;
  kostenEl.textContent = `€ ${DATA.kosten[idx].toLocaleString('nl-NL')}k`;
  document.querySelectorAll('.step').forEach(s => s.classList.toggle('is-active', +s.dataset.index === idx));
}
setRound(0);

const steps = [...document.querySelectorAll('.step')];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setRound(+e.target.dataset.index); });
}, { rootMargin: '-45% 0px -45% 0px' });
steps.forEach(s => io.observe(s));
// terug naar start als je boven de eerste ronde zit
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && e.boundingClientRect.top > 0) setRound(0);
}, { rootMargin: '0px 0px -55% 0px' }).observe(document.querySelector('.rounds__lead'));

/* ---------- Tabel ---------- */
const rows = [
  ['Loyaliteitsscore', DATA.loyaliteit.map(v => nl(v))],
  ['Tevredenheid', DATA.tevredenheid.map(v => nl(v))],
  ['Ziekteverzuim', DATA.verzuim.map(v => nl(v) + '%')],
  ['Personeelskosten (× € 1.000)', DATA.kosten.map(v => v.toLocaleString('nl-NL'))],
  ['Mijn KPI', DATA.kpi.map(v => nl(v, 2))],
];
document.getElementById('data-table').innerHTML =
  `<thead><tr><th scope="col"></th>${DATA.labels.map(l => `<th scope="col">${l}</th>`).join('')}</tr></thead>` +
  `<tbody>${rows.map(([n, vs]) => `<tr><th scope="row">${n}</th>${vs.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody>`;

/* ---------- Koppen per regel laten opkomen ---------- */
document.querySelectorAll('.split').forEach(h => {
  const parts = h.innerHTML.split(/<br\s*\/?>/i);
  h.innerHTML = parts.map((p, i) => `<span class="line"><span style="--i:${i}">${p.trim()}</span></span>`).join('');
});
document.querySelectorAll('.stagger').forEach(list => {
  [...list.children].forEach((c, i) => c.style.setProperty('--i', i));
});

/* ---------- Tellers ---------- */
function countUp(node) {
  const to = parseFloat(node.dataset.to);
  const dec = +node.dataset.dec || 0;
  const fmt = v => (v < 0 ? '−' : '') + nl(Math.abs(v), dec);
  if (reduceMotion) { node.textContent = fmt(to); return; }
  const start = performance.now(), dur = 1400;
  const tick = now => {
    const t = Math.min(1, (now - start) / dur);
    node.textContent = fmt(to * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Zichtbaar worden bij scrollen ---------- */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    e.target.querySelectorAll('.count').forEach(countUp);
    revealIO.unobserve(e.target);
  });
}, { rootMargin: '0px 0px -12% 0px' });
document.querySelectorAll('.split, .reveal, .stagger').forEach(n => revealIO.observe(n));

/* ---------- Parallax en leesvoortgang ---------- */
const bar = document.querySelector('.progress span');
const pxEls = reduceMotion ? [] : [...document.querySelectorAll('.px')];
let ticking = false;
function onScroll() {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const mid = innerHeight / 2;
  pxEls.forEach(n => {
    const r = n.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    const d = r.top + r.height / 2 - mid;
    const speed = +n.dataset.speed || 0;
    const rot = (+n.dataset.rotate || 0) * Math.max(-1, Math.min(1, d / innerHeight));
    n.style.transform = `translate3d(0, ${(-d * speed).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
  });
}
addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
addEventListener('resize', onScroll);
onScroll();

/* ---------- Video van het blikje (optioneel) ---------- */
const video = document.querySelector('.hero__video');
if (video) {
  const sources = [...video.querySelectorAll('source')];
  let failed = 0;
  sources.forEach(s => s.addEventListener('error', () => {
    if (++failed === sources.length) video.remove();
  }));
  video.addEventListener('loadeddata', () => {
    document.body.classList.add('has-video');
    if (reduceMotion) return;
    video.play().catch(() => {});
  });
}

/* ---------- Bubbels: het "pssht"-moment bij het openen ---------- */
(function bubbles() {
  const canvas = document.querySelector('.hero__bubbles');
  if (!canvas || reduceMotion) { if (canvas) canvas.remove(); return; }
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  let w, h, dpr, parts = [], visible = true, burstDone = false;

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  // herkomst: bovenkant van het blikje
  function origin() {
    const can = document.querySelector('.hero__can');
    const hr = hero.getBoundingClientRect();
    if (!can || document.body.classList.contains('has-video')) return { x: w * 0.75, y: h * 0.3 };
    const r = can.getBoundingClientRect();
    return { x: r.left + r.width * 0.55 - hr.left, y: r.top + r.height * 0.06 - hr.top };
  }
  function spawn(burst) {
    const o = burst ? origin() : { x: Math.random() * w, y: h + 10 };
    const a = burst ? -Math.PI / 2 + (Math.random() - 0.5) * 1.6 : -Math.PI / 2;
    const v = burst ? 2 + Math.random() * 5 : 0.3 + Math.random() * 0.7;
    parts.push({
      x: o.x, y: o.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      r: burst ? 1.5 + Math.random() * 4 : 1 + Math.random() * 3.5,
      life: 1, decay: burst ? 0.006 + Math.random() * 0.01 : 0.0012 + Math.random() * 0.002,
      wob: Math.random() * Math.PI * 2,
    });
  }
  function frame() {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    if (parts.length < 46 && Math.random() < 0.25) spawn(false);
    parts = parts.filter(p => p.life > 0 && p.y > -20);
    parts.forEach(p => {
      p.wob += 0.04;
      p.vy = p.vy * 0.985 - 0.012;
      p.vx *= 0.97;
      p.x += p.vx + Math.sin(p.wob) * 0.35;
      p.y += p.vy;
      p.life -= p.decay;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(190, 255, 223, ${0.55 * p.life})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = `rgba(190, 255, 223, ${0.12 * p.life})`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  size();
  addEventListener('resize', size);
  new IntersectionObserver(([e]) => {
    const was = visible;
    visible = e.isIntersecting;
    if (visible && !was) requestAnimationFrame(frame);
  }).observe(hero);
  // de burst valt samen met het moment dat het blikje landt
  setTimeout(() => {
    if (burstDone) return;
    burstDone = true;
    for (let i = 0; i < 70; i++) spawn(true);
  }, 1300);
  requestAnimationFrame(frame);
})();

/* ---------- Intro ---------- */
if (!reduceMotion) requestAnimationFrame(() => document.body.classList.add('is-loaded'));
else document.body.classList.add('is-loaded', 'no-motion');
