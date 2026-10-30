# 见闻周刊 · 站点

每周一期的硬来源新闻周刊，静态站，由 `sourced-news-brief` 流程生成。

- 总目录：`/`（按期倒序，卡片式）
- 单期：`/issues/<期号>/index.html`（周刊）/ `brief.html`（60 条审计层）/ `dashboard.html`（交互总纲）
- 图片：`/assets/img/<期号>/`，出处见同期 `credits.json`，正文标注「图：机构」
- 双主题：日间 / 夜间，跟随系统，手动切换写入 localStorage

## 图片策略

1. 能取到 `og:image` 的条目用原站配图（本地托管 + 标注出处 + 原链接）；
2. 取不到照片的类目用**自产 SVG 数字卡**（大数字 + 一句事实），零版权风险；
3. 本站不热链，所有图片本地化，来源与许可在 `credits.json` 里。

## 构建

```bash
python3 ~/.hermes/skills/research/sourced-news-brief/scripts/build_site.py \
  --issue-dir /Users/ssh/briefs/<期号> --site . --issue-id <期号> --publish-audit
```

## 内容说明

每条新闻带明文 URL 与逐字引用；`issues/<期号>/data/` 下有 `entries.jsonl`、`ledger.all.json`
和 `pages/`（正文落盘原文），可用来自查任何数字。图片版权归原机构，仅作摘要引用。
