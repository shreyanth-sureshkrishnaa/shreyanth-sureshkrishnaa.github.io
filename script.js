document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const stored = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  let mode = stored ? stored : (prefersLight ? 'light' : 'dark');

  function applyMode(m) {
    if (m === 'light') {
      document.body.classList.add('light-mode');
      toggle.textContent = '☀️';
      toggle.setAttribute('aria-pressed', 'true');
      toggle.title = 'Switch to dark mode';
    } else {
      document.body.classList.remove('light-mode');
      toggle.textContent = '🌙';
      toggle.setAttribute('aria-pressed', 'false');
      toggle.title = 'Switch to light mode';
    }
  }

  applyMode(mode);

  toggle.addEventListener('click', function () {
    mode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyMode(mode);
    localStorage.setItem('theme', mode);
  });

  // Allow toggling with keyboard when focused and Enter/Space pressed (button already handles this, but keep for robustness)
  toggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
});
