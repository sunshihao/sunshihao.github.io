/* 主题切换：localStorage 记住选择，默认跟随系统 */
(function () {
  var KEY = 'sw-theme';
  var root = document.documentElement;

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function current() {
    return root.getAttribute('data-theme') || systemTheme();
  }
  function paint(theme) {
    root.setAttribute('data-theme', theme);
    var label = theme === 'dark' ? '☀ 日间' : '☾ 夜间';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.textContent = label;
      b.setAttribute('aria-label', theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
      b.setAttribute('title', b.getAttribute('aria-label'));
    });
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', theme === 'dark' ? '#121211' : '#fbfaf7');
    });
  }
  window.toggleTheme = function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    paint(next);
  };
  document.addEventListener('DOMContentLoaded', function () { paint(current()); });
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      var saved = null;
      try { saved = localStorage.getItem(KEY); } catch (e) {}
      if (!saved) paint(systemTheme());
    });
  }
})();
