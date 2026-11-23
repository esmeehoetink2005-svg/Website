/* Meetings die waarde maken — kleine interacties zonder externe scripts */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('no-js');

  /* ---------- Programma (mobiele navigatie) ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('programma');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ---------- Tabbladen ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-tabs]'), function (box, bi) {
    var panels = box.querySelectorAll('.tabpanel');
    if (panels.length < 2) return;
    var list = document.createElement('div');
    list.className = 'tablist';
    list.setAttribute('role', 'tablist');
    var buttons = [];
    Array.prototype.forEach.call(panels, function (panel, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.id = 'tab-' + bi + '-' + i;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', panel.id);
      b.textContent = panel.getAttribute('data-label');
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', b.id);
      panel.setAttribute('tabindex', '0');
      b.addEventListener('click', function () { select(i, false); });
      b.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % panels.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + panels.length) % panels.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = panels.length - 1;
        if (n !== null) { e.preventDefault(); select(n, true); }
      });
      buttons.push(b);
      list.appendChild(b);
    });
    function select(i, focus) {
      buttons.forEach(function (b, j) {
        var on = i === j;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) buttons[i].focus();
    }
    box.insertBefore(list, panels[0]);
    box.classList.add('is-enhanced');
    var start = 0;
    Array.prototype.forEach.call(panels, function (p, i) { if (location.hash === '#' + p.id) start = i; });
    select(start, false);
  });

  /* ---------- Afvinklijsten (onthouden in localStorage) ---------- */
  var KEY = 'mdwm-checks';
  function load() {
    try { return JSON.parse(window.localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* opslag geblokkeerd: lijst werkt alleen voor deze sessie */ }
  }
  var state = load();
  Array.prototype.forEach.call(document.querySelectorAll('[data-checklist]'), function (list) {
    var boxes = list.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(boxes, function (box) {
      var k = box.getAttribute('data-key');
      box.checked = !!state[k];
      box.addEventListener('change', function () {
        if (box.checked) state[k] = true; else delete state[k];
        save(state);
      });
    });
    var clear = list.querySelector('[data-clear]');
    if (clear) {
      clear.addEventListener('click', function () {
        Array.prototype.forEach.call(boxes, function (box) {
          box.checked = false;
          delete state[box.getAttribute('data-key')];
        });
        save(state);
      });
    }
  });

  /* ---------- Afdrukken: alles open ---------- */
  var reopen = [];
  window.addEventListener('beforeprint', function () {
    Array.prototype.forEach.call(document.querySelectorAll('details:not([open])'), function (d) {
      d.open = true; reopen.push(d);
    });
  });
  window.addEventListener('afterprint', function () {
    reopen.forEach(function (d) { d.open = false; });
    reopen = [];
  });
})();
