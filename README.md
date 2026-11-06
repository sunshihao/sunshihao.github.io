# 见闻周刊 · 站点源码

个人新闻周刊的静态站，Astro 7 构建，发布在 GitHub Pages。

- **源码**：本分支（`main`）
- **构建产物**：`weekly` 分支，Pages 从该分支根目录发布

## 结构

```
astro.config.mjs        站点配置（site、build.format，brief.html 改写钩子）
src/layouts/Base.astro  全站壳子：head / og / 顶栏 / 页脚 / 评论区
src/lib/render.mjs      media.json → 封面 / 画廊 / 数字卡 / 章节头
src/pages/index.astro   总目录
src/pages/issues/[id]/  一期三页：index（周刊）、brief（审计层）、dashboard 由 public 提供
scripts/sync.mjs        从本地 briefs 目录同步内容与图片
scripts/finalize.mjs    补齐 .nojekyll / README / STYLE
public/                 样式、脚本、品牌资产、往期图片
```

## 本地构建

```bash
pnpm install
npm run build      # sync → astro build → finalize，输出 dist/
```

`scripts/sync.mjs` 读取 `~/briefs/<期目录>/` 的 `weekly.md`、`brief.md`、`media.json`、`assets/img`、`pages/`、`entries.jsonl`，
生成本仓库的 `src/data/` 与 `public/`（这两个目录不入库）。

## 发布

```bash
bash ~/.hermes/skills/research/sourced-news-brief/scripts/deploy_site.sh <期目录>
```

脚本会跑校验 → 构建 → 用 REST API 把 `dist/` 推到 `weekly` 分支。

## 样式

`public/assets/css/site.css` 是唯一真源（双主题、变量驱动）。改样式只改这里，别在构建产物里改。
