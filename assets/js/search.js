/* 全站搜索：懒加载 /search.json，在标题、摘要、周刊正文、审计层里找 */
(function () {
    var dialog = document.querySelector("[data-search]");
    var openBtn = document.querySelector("[data-search-open]");
    if (!dialog || !openBtn) return;
    if (typeof dialog.showModal !== "function") {
        openBtn.hidden = true;
        return;
    }

    var input = dialog.querySelector("[data-search-input]");
    var resultsEl = dialog.querySelector("[data-search-results]");
    var indexPromise = null;
    var issues = null;
    var active = -1;
    var timer = 0;

    var CJK = /[㐀-鿿豈-﫿]/;
    var CJK_RUN = /[㐀-鿿豈-﫿]+|[^㐀-鿿豈-﫿]+/g;

    function normalize(s) {
        s = String(s || "");
        try {
            return s.normalize("NFKC").toLowerCase();
        } catch (e) {
            return s.toLowerCase();
        }
    }

    function unique(list) {
        var seen = {};
        return list.filter(function (t) {
            if (!t || seen[t]) return false;
            seen[t] = 1;
            return true;
        });
    }

    function bigrams(s) {
        var out = [];
        for (var i = 0; i < s.length - 1; i++) out.push(s.slice(i, i + 2));
        return out;
    }

    function countIn(text, term) {
        if (!term) return 0;
        var n = 0;
        var p = 0;
        while (n < 20 && (p = text.indexOf(term, p)) !== -1) {
            n++;
            p += term.length;
        }
        return n;
    }

    // 英文/数字按词边界，避免 "ai" 命中 "said"
    function latinCount(text, term) {
        if (!/^[a-z0-9]+$/.test(term)) return countIn(text, term);
        var re = new RegExp("(^|[^a-z0-9])" + term + "(?=[^a-z0-9]|$)", "g");
        var n = 0;
        while (n < 20 && re.exec(text)) n++;
        return n;
    }

    // 把查询拆成英文词 + 中文片段；中文片段再用 bigram 覆盖率兜底
    function parseQuery(qRaw) {
        var q = normalize(qRaw).trim();
        if (!q) return [];
        var units = [];

        q.split(/\s+/).forEach(function (token) {
            var parts = token.match(CJK_RUN) || [];
            parts.forEach(function (part) {
                part = part.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
                if (!part) return;
                if (CJK.test(part)) {
                    units.push({
                        type: "cjk",
                        text: part,
                        grams: bigrams(part),
                    });
                } else {
                    units.push({ type: "latin", text: part });
                }
            });
        });

        return units.filter(function (u, i) {
            return (
                units.findIndex(function (x) {
                    return x.type === u.type && x.text === u.text;
                }) === i
            );
        });
    }

    function unitScore(text, unit) {
        if (unit.type === "latin") {
            var n = latinCount(text, unit.text);
            return n ? { good: n, terms: [unit.text] } : null;
        }

        if (unit.text.length === 1) {
            var one = countIn(text, unit.text);
            return one ? { good: one * 0.2, terms: [unit.text] } : null;
        }

        var exact = countIn(text, unit.text);
        if (exact) return { good: 3 + Math.min(exact, 8), terms: [unit.text] };

        var flags = unit.grams.map(function (g) {
            return text.indexOf(g) !== -1;
        });
        var matched = 0;
        flags.forEach(function (ok) {
            if (ok) matched++;
        });
        var coverage = matched / unit.grams.length;
        // 2 个 bigram 的短语（3 字）必须全部命中；更长短语允许 60% 覆盖率
        var need = unit.grams.length <= 2 ? 1 : 0.6;
        if (coverage + 1e-9 < need) return null;

        // 相邻命中的 bigram 合成更长的词，用于高亮（英伟 + 伟达 → 英伟达）
        var terms = [];
        var start = -1;
        for (var i = 0; i <= flags.length; i++) {
            if (i < flags.length && flags[i]) {
                if (start === -1) start = i;
            } else if (start !== -1) {
                terms.push(unit.text.slice(start, i + 1));
                start = -1;
            }
        }

        return { good: coverage * 2, terms: terms };
    }

    function load() {
        if (!indexPromise) {
            indexPromise = fetch("/search.json")
                .then(function (r) {
                    if (!r.ok) throw new Error("HTTP " + r.status);
                    return r.json();
                })
                .then(function (data) {
                    issues = (data.issues || []).map(function (it) {
                        return {
                            raw: it,
                            title: normalize(it.title),
                            summary: normalize(it.summary),
                            weekly: normalize(it.weekly),
                            brief: normalize(it.brief),
                        };
                    });
                    return issues;
                });
        }
        return indexPromise;
    }

    function pickSource(it, units) {
        var fields = [
            { label: "正文", text: it.weekly, raw: it.raw.weekly },
            { label: "审计层", text: it.brief, raw: it.raw.brief },
            { label: "摘要", text: it.summary, raw: it.raw.summary },
        ];

        // 正文能完整命中就优先给正文，其次审计层，最后摘要
        var source = null;
        for (var i = 0; i < fields.length && !source; i++) {
            var full = units.every(function (u) {
                return unitScore(fields[i].text, u);
            });
            if (full) source = fields[i];
        }

        if (!source) {
            var best = null;
            fields.forEach(function (f) {
                var good = 0;
                units.forEach(function (u) {
                    var m = unitScore(f.text, u);
                    if (m) good += m.good;
                });
                if (good && (!best || good > best.good))
                    best = { field: f, good: good };
            });
            source = best ? best.field : fields[2];
        }

        var terms = [];
        units.forEach(function (u) {
            var m = unitScore(source.text, u);
            if (m) terms = terms.concat(m.terms);
        });

        return { label: source.label, raw: source.raw, terms: unique(terms) };
    }

    function makeSnippet(text, terms) {
        if (!text) return "";
        var lower = normalize(text);
        var before = 42;
        var after = 110;
        var positions = [];

        terms.forEach(function (t) {
            var p = lower.indexOf(t);
            var n = 0;
            while (p !== -1 && n < 30) {
                positions.push(p);
                p = lower.indexOf(t, p + t.length);
                n++;
            }
        });

        if (!positions.length) return text.slice(0, 120);

        // 选覆盖关键词最多的窗口，而不是简单取第一个命中
        var bestPos = positions[0];
        var bestCount = -1;
        positions.forEach(function (pos) {
            var start = Math.max(0, pos - before);
            var end = Math.min(lower.length, pos + after);
            var count = terms.filter(function (t) {
                var i = lower.indexOf(t, start);
                return i !== -1 && i < end;
            }).length;
            if (count > bestCount || (count === bestCount && pos < bestPos)) {
                bestCount = count;
                bestPos = pos;
            }
        });

        var start = Math.max(0, bestPos - before);
        var end = Math.min(text.length, bestPos + after);
        var s = text.slice(start, end).replace(/\s+/g, " ").trim();
        return (start > 0 ? "…" : "") + s + (end < text.length ? "…" : "");
    }

    function search(q) {
        var units = parseQuery(q);
        if (!units.length) return [];
        var hits = [];

        issues.forEach(function (it) {
            var score = 0;
            var terms = [];
            var all = true;

            for (var i = 0; i < units.length; i++) {
                var best = null;
                var fields = [
                    [it.title, 140],
                    [it.summary, 35],
                    [it.weekly, 10],
                    [it.brief, 4],
                ];

                for (var f = 0; f < fields.length; f++) {
                    var m = unitScore(fields[f][0], units[i]);
                    if (!m) continue;
                    var s = m.good * fields[f][1];
                    if (!best || s > best.s) best = { s: s, terms: m.terms };
                }

                if (!best) {
                    all = false;
                    break;
                }
                score += best.s;
                terms = terms.concat(best.terms);
            }

            if (!all) return;

            var source = pickSource(it, units);
            var snippetTerms = unique(terms.concat(source.terms));
            hits.push({
                issue: it.raw,
                terms: unique(terms),
                score: score,
                source: source.label,
                url: source.label === "审计层" ? it.raw.briefUrl : it.raw.url,
                snippet: makeSnippet(source.raw, snippetTerms),
            });
        });

        hits.sort(function (a, b) {
            return (
                b.score - a.score ||
                String(b.issue.date).localeCompare(String(a.issue.date))
            );
        });
        return hits;
    }

    function highlighted(text, terms) {
        var frag = document.createDocumentFragment();
        var parts = terms
            .filter(Boolean)
            .sort(function (a, b) {
                return b.length - a.length;
            })
            .map(function (t) {
                return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            });

        if (!parts.length) {
            frag.appendChild(document.createTextNode(text));
            return frag;
        }

        var re = new RegExp("(" + parts.join("|") + ")", "gi");
        text.split(re).forEach(function (part, i) {
            if (!part) return;
            if (i % 2) {
                var mark = document.createElement("mark");
                mark.textContent = part;
                frag.appendChild(mark);
            } else {
                frag.appendChild(document.createTextNode(part));
            }
        });
        return frag;
    }

    function titleOf(issue) {
        return String(issue.title || "").replace(/^见闻周刊（[^）]*）：/, "");
    }

    function metaOf(issue, source) {
        return (
            (issue.no ? "第 " + issue.no + " 期 · " : "") +
            issue.date +
            (source ? " · " + source : "")
        );
    }

    function hitNode(issue, terms, source, snippet) {
        var a = document.createElement("a");
        a.className = "search-hit";
        a.href = source === "审计层" ? issue.briefUrl : issue.url;
        a.id = "search-hit-" + resultsEl.querySelectorAll(".search-hit").length;

        var top = document.createElement("span");
        top.className = "search-hit-top";

        var title = document.createElement("span");
        title.className = "search-hit-title";
        title.appendChild(highlighted(titleOf(issue), terms));

        var meta = document.createElement("span");
        meta.className = "search-hit-meta";
        meta.textContent = metaOf(issue, source);

        var body = document.createElement("span");
        body.className = "search-hit-snippet";
        body.appendChild(highlighted(snippet, terms));

        top.appendChild(title);
        top.appendChild(meta);
        a.appendChild(top);
        a.appendChild(body);
        return a;
    }

    function setHint(text) {
        resultsEl.textContent = "";
        var p = document.createElement("p");
        p.className = "search-hint";
        p.textContent = text;
        resultsEl.appendChild(p);
    }

    function renderIdle() {
        resultsEl.textContent = "";
        active = -1;
        if (!issues) {
            setHint("输入关键词，搜索标题、正文与审计层。");
            return;
        }
        var p = document.createElement("p");
        p.className = "search-hint";
        p.textContent = "最近发布";
        resultsEl.appendChild(p);
        issues.slice(0, 5).forEach(function (it) {
            resultsEl.appendChild(
                hitNode(it.raw, [], "", it.raw.summary || ""),
            );
        });
    }

    function render(hits, q) {
        resultsEl.textContent = "";
        active = -1;

        if (!hits.length) {
            setHint("没有找到与「" + q + "」相关的内容，试试更短的关键词。");
            return;
        }

        var count = document.createElement("p");
        count.className = "search-count";
        count.textContent = "找到 " + hits.length + " 期";
        resultsEl.appendChild(count);

        hits.slice(0, 20).forEach(function (hit) {
            resultsEl.appendChild(
                hitNode(hit.issue, hit.terms, hit.source, hit.snippet),
            );
        });
    }

    function run(q) {
        var hits = search(q);
        if (dialog.open && input.value.trim() === q) render(hits, q);
    }

    function onInput() {
        var q = input.value.trim();
        clearTimeout(timer);
        active = -1;

        if (!q) {
            renderIdle();
            return;
        }
        if (!issues) {
            setHint("正在载入搜索索引…");
            load()
                .then(function () {
                    if (input.value.trim() === q) run(q);
                })
                .catch(function () {
                    setHint("搜索索引加载失败，请稍后重试。");
                });
            return;
        }
        timer = setTimeout(function () {
            run(q);
        }, 120);
    }

    function open() {
        if (dialog.open) return;
        dialog.showModal();
        document.documentElement.classList.add("search-open");
        input.value = "";
        renderIdle();
        input.focus();
        load()
            .then(function () {
                if (dialog.open && !input.value.trim()) renderIdle();
            })
            .catch(function () {
                if (dialog.open) setHint("搜索索引加载失败，请稍后重试。");
            });
    }

    function close() {
        if (dialog.open) dialog.close();
    }

    function isTyping(el) {
        return (
            el &&
            (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) ||
                el.isContentEditable)
        );
    }

    openBtn.addEventListener("click", open);
    dialog
        .querySelector("[data-search-close]")
        .addEventListener("click", close);
    dialog.addEventListener("click", function (e) {
        if (e.target === dialog) close();
    });
    dialog.addEventListener("close", function () {
        document.documentElement.classList.remove("search-open");
        input.value = "";
    });
    resultsEl.addEventListener("click", function (e) {
        if (e.target.closest(".search-hit")) close();
    });
    input.addEventListener("input", onInput);

    input.addEventListener("keydown", function (e) {
        var hits = resultsEl.querySelectorAll(".search-hit");
        if (!hits.length) return;

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (e.key === "ArrowDown")
                active = Math.min(active + 1, hits.length - 1);
            else active = Math.max(active - 1, 0);
            hits.forEach(function (h, i) {
                h.classList.toggle("is-active", i === active);
            });
            hits[active].scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter") {
            if (active === -1) active = 0;
            if (active > -1) {
                e.preventDefault();
                hits[active].click();
                close();
            }
        }
    });

    document.addEventListener("keydown", function (e) {
        var key = String(e.key).toLowerCase();
        if ((e.metaKey || e.ctrlKey) && key === "k") {
            e.preventDefault();
            open();
        } else if (e.key === "/" && !dialog.open && !isTyping(e.target)) {
            e.preventDefault();
            open();
        }
    });
})();
