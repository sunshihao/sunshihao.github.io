# 版式与风格规范（共同样式）

本仓库是「见闻周刊」的唯一发布地。所有期共用一套样式与交互，**新增一期只加内容，不改样式**。

- 样式：`assets/css/site.css`（唯一来源，变量驱动的双主题）
- 交互：`assets/js/theme.js`（明暗切换 + localStorage 记忆 + 跟随系统）
- 版式说明：本文件
- 内容：`issues/<期号>/index.html`（周刊）、`brief.html`（审计层）、`dashboard.html`（交互总纲）、`data/`（可核验原始数据）
- 图片：`assets/img/<期号>/`，出处登记在同目录 `credits.json`

## 1. 设计原则

1. **像一篇杂志，不像一个后台**：单栏 760px 正文，衬线中文，行高 1.8。
2. **一屏一个重点**：开头一张封面图，下面一个论点，再往后才是条目。
3. **层级靠字号和留白，不靠边框**：只有卡片和图片用边框/圆角。
4. **一个强调色**：`--accent`（浅色模式墨绿 / 深色模式薄荷绿），其余颜色只给类目圆点用。
5. **两种主题同等对待**：所有颜色必须用变量，禁止在 HTML 里写死十六进制。

## 2. 颜色变量

| 变量 | 浅色 | 深色 | 用途 |
|---|---|---|---|
| `--bg` | `#fbfaf7` | `#121211` | 页面底色（带一点米色的纸感） |
| `--bg-soft` | `#f2f1ec` | `#1a1a19` | 数字卡底、表头底 |
| `--fg` | `#1b1b1b` | `#e8e6e1` | 正文 |
| `--fg-soft` | `#4a4a48` | `#c3c1bb` | 次级正文 |
| `--muted` | `#7c7a73` | `#8d8b85` | 元信息、图注 |
| `--line` | `#e3e1d9` | `#2a2a28` | 分隔线、卡片描边 |
| `--accent` | `#0b6e4f` | `#5ecfa4` | 链接、强调、按钮悬停 |
| `--card` | `#fff` | `#1b1b1a` | 卡片底 |
| `--c-politics` | `#9b3d5c` | `#e08aa8` | 政治类目点 |
| `--c-markets` | `#1f5f8b` | `#7ab6e0` | 财经 |
| `--c-tech` | `#6a4a9c` | `#b39ae0` | 科技 |
| `--c-ai` | `#0b6e4f` | `#5ecfa4` | AI |
| `--c-cn` | `#a8621b` | `#e0a765` | 国内股市 |
| `--c-fut` | `#3a6b35` | `#8ec98a` | 期货商品 |

主题切换靠 `<html data-theme="light|dark">`；没有显式值时用 `prefers-color-scheme`。

## 3. 字号层级

| 元素 | 尺寸 | 说明 |
|---|---|---|
| `h1` | `clamp(1.6rem, 3.4vw, 2.3rem)` | 一期标题 |
| `h2` | `1.22rem` | 类目（前面带类目色圆点） |
| `h3` | `1.02–1.06rem` | 条目标题 |
| 正文 | `17px / 1.8` | 移动端降到 16px |
| `.sub` / `figcaption` | `.74–.84rem` | 图注、元信息 |

## 4. 组件

- **`.topbar`**：粘顶，半透明 + 毛玻璃；左侧品牌，右侧主题按钮。
- **`.hero`**：封面图 16:9~38vw 高，底部渐变叠标题；图注「图：机构」带原链接。
- **`.section-head`**：类目色圆点 + `h2`，替代传统下划线标题。
- **`.cards` / `.card`**：总目录与图片墙共用；卡片内 `.thumb`（16:9）+ `.body`。
- **`.cards.gallery`**：正文里的图片墙，密排小卡（210px 起，4:3）。
- **`.numcard`**：**没有照片时的自产 SVG 数字卡**——一个大数字 + 单位 + 一行事实，颜色取类目色。
- **`figure/figcaption`**：所有配图统一走这个结构，图注必须写「图：机构 + 原链接」。
- **`blockquote`**：言论栏目，左侧强调色竖线。

## 5. 图片规则（硬性）

1. **一律本地**：图片下载到 `assets/img/<期号>/`，页面用相对路径引用。**禁止** `src="http..."` 远程图片——原站改路径就会烂图。
2. 每张图的出处写进 `assets/img/<期号>/credits.json`（机构、原页面 URL、图片 URL），图注里再挂一次链接。
3. 抓不到图的类目**用 `.numcard` 自产数字卡**，不要拿无关图凑数。
4. 校验：`grep -ro 'src="http' --include=*.html .` 必须为空。

## 6. 新增一期

```bash
# briefs 目录里已有 weekly.md / brief.md / index.html / entries.jsonl / pages/ / media.json
python3 ~/.hermes/skills/research/sourced-news-brief/scripts/build_site.py \
  --issue-dir /Users/ssh/briefs/<期号> --site . --issue-id <期号> --publish-audit
# 或一键（含图片校验、引文校验、commit、push）
~/.hermes/skills/research/sourced-news-brief/scripts/deploy_site.sh /Users/ssh/briefs/<期号>
```

新增期会自动出现在首页总目录（`assets/data/issues.json` 由脚本维护，勿手改）。
