/* Kady No1 Hair Braiding — site behaviour (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motionOK = !reduce.matches;

  /* ---------- header shadow + mobile menu ---------- */
  var header = document.querySelector('[data-header]');
  var btn = document.querySelector('[data-menu-btn]');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    if (!btn || !nav) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    doc.classList.toggle('menu-open', open);
    var label = btn.querySelector('.menu-label');
    if (label) label.textContent = open ? 'Close' : 'Menu';
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 1000px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---------- reveal on view ---------- */
  var revealEls = document.querySelectorAll('.reveal, .part-reveal');
  if ('IntersectionObserver' in window && motionOK) {
    // clip-path hides .part-reveal from IntersectionObserver, so observe its (unclipped) parent
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var t = en.target._revealTarget || en.target;
          t.classList.add('is-in'); io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) {
      var obs = el;
      if (el.classList.contains('part-reveal') && el.parentElement) { obs = el.parentElement; obs._revealTarget = el; }
      io.observe(obs);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- scroll-scrubbed drawing: hero portrait, parting lines, marble sheen ---------- */
  var portrait = document.querySelector('[data-portrait]');
  var hero = document.querySelector('[data-hero]');
  var partings = Array.prototype.slice.call(document.querySelectorAll('.parting'));
  var sheens = Array.prototype.slice.call(document.querySelectorAll('[data-sheen]'));
  var intro = 0; // load-time intro so the drawing is already underway
  var ticking = false;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function update() {
    ticking = false;
    var vh = window.innerHeight || 800;
    if (portrait && hero) {
      // completes within the first ~35% of a viewport of scrolling
      var scrolled = clamp(window.scrollY / (vh * 0.35));
      var d = Math.max(intro, scrolled);
      portrait.style.setProperty('--draw', d.toFixed(4));
      portrait.style.setProperty('--tex', clamp((d - 0.75) / 0.25).toFixed(3));
    }
    for (var i = 0; i < partings.length; i++) {
      var r = partings[i].getBoundingClientRect();
      var p = clamp((vh - r.top) / (vh * 0.45));
      partings[i].style.setProperty('--p', ease(p).toFixed(4));
    }
    for (var j = 0; j < sheens.length; j++) {
      var s = sheens[j].getBoundingClientRect();
      var q = clamp((vh - s.top) / (vh + s.height));
      sheens[j].style.setProperty('--sheen', q.toFixed(4));
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  if (motionOK) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    if (portrait) {
      var start = null;
      var introStep = function (t) {
        if (start === null) start = t;
        var k = clamp((t - start - 350) / 1600);
        intro = ease(k) * 0.42;
        update();
        if (k < 1) requestAnimationFrame(introStep);
      };
      requestAnimationFrame(introStep);
    }
    update();
  }
  if (header) {
    var setHeader = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', setHeader, { passive: true });
    setHeader();
  }

  /* ---------- highlight today in hours tables ---------- */
  try {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var today = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/New_York' }).format(new Date());
    if (days.indexOf(today) > -1) {
      document.querySelectorAll('tr[data-day="' + today + '"]').forEach(function (tr) {
        tr.classList.add('is-today');
        var th = tr.querySelector('th');
        if (th) th.insertAdjacentHTML('beforeend', ' <span class="sr-only">(today)</span>');
      });
    }
  } catch (e) { /* no-op */ }
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- gallery filters + lightbox ---------- */
  var grid = document.querySelector('[data-gallery]');
  if (grid) {
    var chips = document.querySelectorAll('.chip');
    var status = document.querySelector('[data-gallery-status]');
    var items = Array.prototype.slice.call(grid.querySelectorAll('.g-item'));
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        var n = 0;
        items.forEach(function (it) {
          var show = f === 'all' || (' ' + it.getAttribute('data-cats') + ' ').indexOf(' ' + f + ' ') > -1;
          it.hidden = !show;
          if (show) { n++; var pr = it.querySelector('.part-reveal'); if (pr) pr.classList.add('is-in'); }
        });
        if (status) status.textContent = 'Showing ' + n + ' photo' + (n === 1 ? '' : 's') + ': ' + chip.textContent;
      });
    });

    var lb = document.querySelector('[data-lb]');
    if (lb && typeof lb.showModal === 'function') {
      var lbImg = lb.querySelector('[data-lb-img]');
      var lbCap = lb.querySelector('[data-lb-cap]');
      var links = Array.prototype.slice.call(grid.querySelectorAll('[data-lightbox]'));
      var cur = 0, opener = null;
      var visible = function () { return links.filter(function (a) { return !a.closest('.g-item').hidden; }); };
      var show = function (a) {
        lbImg.src = a.getAttribute('href');
        lbImg.alt = a.getAttribute('data-alt') || '';
        lbImg.width = +a.getAttribute('data-w');
        lbImg.height = +a.getAttribute('data-h');
        lbCap.textContent = a.getAttribute('data-caption') || '';
      };
      var step = function (dir) {
        var v = visible(); if (!v.length) return;
        var idx = v.indexOf(links[cur]);
        idx = (idx + dir + v.length) % v.length;
        cur = links.indexOf(v[idx]);
        show(links[cur]);
      };
      links.forEach(function (a, i) {
        a.addEventListener('click', function (e) {
          e.preventDefault(); cur = i; opener = a; show(a); lb.showModal(); doc.classList.add('menu-open');
        });
      });
      lb.querySelector('[data-lb-close]').addEventListener('click', function () { lb.close(); });
      lb.querySelector('[data-lb-prev]').addEventListener('click', function () { step(-1); });
      lb.querySelector('[data-lb-next]').addEventListener('click', function () { step(1); });
      lb.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      });
      lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-inner')) lb.close(); });
      lb.addEventListener('close', function () { doc.classList.remove('menu-open'); if (opener) opener.focus(); });
      var tx = null;
      lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) {
        if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      });
    }
  }

  /* ---------- Netlify form: validation + AJAX submit ---------- */
  var form = document.querySelector('[data-form]');
  if (form) {
    var success = document.querySelector('[data-form-success]');
    var fstatus = form.querySelector('[data-form-status]');
    var showSuccess = function () { form.hidden = true; success.hidden = false; success.focus(); };
    if (/[?&]sent=1/.test(window.location.search)) showSuccess();
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
      phone: function (v) { return v.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a phone number with area code.'; },
      email: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email, or leave it blank.'; },
      style: function (v) { return v ? '' : 'Please choose the style you are interested in.'; }
    };
    var check = function (el) {
      var rule = rules[el.name]; if (!rule) return true;
      var msg = rule(el.value);
      var err = document.getElementById('e-' + el.name);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    };
    Object.keys(rules).forEach(function (k) {
      var el = form.elements[k]; if (!el) return;
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (k) { var el = form.elements[k]; if (el && !check(el) && !firstBad) firstBad = el; });
      if (firstBad) { firstBad.focus(); fstatus.className = 'form-status is-error'; fstatus.textContent = 'Please fix the highlighted fields.'; return; }
      fstatus.className = 'form-status'; fstatus.textContent = 'Sending...';
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function (r) { if (!r.ok) throw new Error(r.status); showSuccess(); })
        .catch(function () {
          fstatus.className = 'form-status is-error';
          fstatus.innerHTML = 'Sorry, your request could not be sent right now. Please call <a href="tel:+18042610313">(804) 261-0313</a> or book on Booksy.';
        });
    });
  }
})();
