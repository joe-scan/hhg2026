'use strict';
// The skin picker. The button is in the shared header, so this has to be too: it lived in the
// front page's own script until 20 Sep 2026, which meant the button did nothing on every other
// page. The choice is this visitor's, kept in their own browser, and it applies to every page.
// With no choice made, a device set to dark mode gets the dark look (see site.css).
(() => {
  const root = document.documentElement, btn = document.getElementById('skin-toggle');
  if (!btn) return;
  const dark = () => root.dataset.skin ? root.dataset.skin === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  const label = () => { btn.textContent = dark() ? btn.dataset.light : btn.dataset.dark; };
  btn.addEventListener('click', () => {
    root.dataset.skin = dark() ? 'light' : 'dark';
    try { localStorage.setItem('hhg-skin', root.dataset.skin); } catch (e) {}
    label();
  });
  label();
})();
