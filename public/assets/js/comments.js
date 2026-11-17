/* 评论区：GitHub 登录（giscus → GitHub Discussions；可切 utterances → Issues）
   评论与回复都存在仓库里，与页面一一对应：讨论标题 = 页面标题，回复 = 嵌套 thread。 */
(function () {
    var cfg = window.SITE_COMMENTS || {};
    var box = document.getElementById("comments-slot");
    if (!box) return;

    function theme() {
        var t = document.documentElement.getAttribute("data-theme");
        if (t) return t;
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    if (cfg.provider === "giscus") {
        if (!cfg.repoId || !cfg.categoryId) return; // 未配置时不渲染
        var s = document.createElement("script");
        s.src = "https://giscus.app/client.js";
        s.async = true;
        s.crossOrigin = "anonymous";
        var attrs = {
            "data-repo": cfg.repo,
            "data-repo-id": cfg.repoId,
            "data-category": cfg.category || "Announcements",
            "data-category-id": cfg.categoryId,
            "data-mapping": "pathname",
            "data-strict": "1",
            "data-reactions-enabled": "1",
            "data-emit-metadata": "0",
            "data-input-position": "top",
            "data-theme": theme() === "dark" ? "dark" : "light",
            "data-lang": "zh-CN",
            "data-loading": "eager",
        };
        Object.keys(attrs).forEach(function (k) {
            s.setAttribute(k, attrs[k]);
        });
        box.appendChild(s);
        // 主题切换时同步 iframe
        window.addEventListener("sw-theme-change", function (e) {
            var f = document.querySelector("iframe.giscus-frame");
            if (!f) return;
            f.contentWindow.postMessage(
                {
                    giscus: {
                        setConfig: {
                            theme: e.detail === "dark" ? "dark" : "light",
                        },
                    },
                },
                "https://giscus.app",
            );
        });
        return;
    }

    if (cfg.provider === "utterances") {
        var u = document.createElement("script");
        u.src = "https://utteranc.es/client.js";
        u.async = true;
        u.crossOrigin = "anonymous";
        u.setAttribute("repo", cfg.repo);
        u.setAttribute("issue-term", "pathname");
        u.setAttribute("label", "comment");
        u.setAttribute(
            "theme",
            theme() === "dark" ? "github-dark" : "github-light",
        );
        box.appendChild(u);
    }
})();
