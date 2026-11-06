/* 返回顶部：滚过一屏后浮现，点击平滑回到页首 */
(function () {
  var btn = document.querySelector('[data-to-top]');
  if (!btn) return;

  var showAt = 600;
  var ticking = false;

  function update() {
    btn.classList.toggle('is-visible', window.scrollY > showAt);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();
