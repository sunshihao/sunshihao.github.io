/* 评论区：GitHub 登录（giscus → GitHub Discussions；可切 utterances → Issues）
   评论与回复都存在仓库里，与页面一一对应：讨论标题 = 页面标题，回复 = 嵌套 thread。 */
(function () {
  var cfg = window.SITE_COMMENTS || {};
  var box = document.getElementById('comments-slot');
  if (!box) return;

  function theme() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function installHint(text) {
    box.innerHTML =
      '<div class="comment-note">' +
      '<p><strong>评论区已就位，还差最后一步。</strong></p>' +
      '<p>' + text + '</p>' +
      '<p>装好后刷新本页即可评论；评论与回复会以 Discussion thread 的形式存进 ' +
      '<a href="https://github.com/' + (cfg.repo || '') + '/discussions" target="_blank" rel="noopener">仓库的 Discussions</a>。</p>' +
      '</div>';
  }

  if (cfg.provider === 'giscus') {
    if (!cfg.repoId || !cfg.categoryId) {
      installHint('需要先在仓库安装 <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">giscus App</a>，并在 <a href="https://giscus.app" target="_blank" rel="noopener">giscus.app</a> 生成 repoId 与 categoryId，填进 <code>assets/data/site.json</code>。');
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    var attrs = {
      'data-repo': cfg.repo,
      'data-repo-id': cfg.repoId,
      'data-category': cfg.category || 'Announcements',
      'data-category-id': cfg.categoryId,
      'data-mapping': 'pathname',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': theme() === 'dark' ? 'dark' : 'light',
      'data-lang': 'zh-CN',
      'data-loading': 'lazy'
    };
    Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    box.appendChild(s);
    // 主题切换时同步 iframe
    window.addEventListener('sw-theme-change', function (e) {
      var f = document.querySelector('iframe.giscus-frame');
      if (!f) return;
      f.contentWindow.postMessage({ giscus: { setConfig: { theme: e.detail === 'dark' ? 'dark' : 'light' } } },
        'https://giscus.app');
    });
    // giscus 只有真正跑起来才会给父页面发 resize 消息；收不到就说明应用没装/仓库没开 Discussions
    var alive = false;
    window.addEventListener('message', function (e) {
      if (e.origin === 'https://giscus.app') alive = true;
    });
    setTimeout(function () {
      var f = document.querySelector('iframe.giscus-frame');
      if (!alive) {
        if (f) f.style.display = 'none';
        installHint('评论区还不能用：需要在仓库上安装一次 <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">giscus App</a>（勾选 sunshihao/sunshihao.github.io）。' +
                    '装完不用改任何代码——页面上的 repoId / categoryId 已经配好。');
      }
    }, 6000);
    return;
  }

  if (cfg.provider === 'utterances') {
    var u = document.createElement('script');
    u.src = 'https://utteranc.es/client.js';
    u.async = true;
    u.crossOrigin = 'anonymous';
    u.setAttribute('repo', cfg.repo);
    u.setAttribute('issue-term', 'pathname');
    u.setAttribute('label', 'comment');
    u.setAttribute('theme', theme() === 'dark' ? 'github-dark' : 'github-light');
    box.appendChild(u);
    return;
  }

  installHint('评论区还没有配置：把 <code>assets/data/site.json</code> 里的 provider 设为 <code>giscus</code> 或 <code>utterances</code> 并填好参数。');
})();
