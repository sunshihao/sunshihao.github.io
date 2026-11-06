#!/usr/bin/env node
// 把 /Users/ssh/briefs/<期目录>/ 的产物同步进 Astro 项目：md、media、图片、审计数据、dashboard。
// 一期一个 id：优先用 media.json 的 issue（20261030-20261105），否则用目录名。
import fs from 'node:fs';
import path from 'node:path';

const BRIEFS = '/Users/ssh/briefs';
const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'src/data');
const PUBLIC = path.join(ROOT, 'public');
const SITE_SRC = '/Users/ssh/sites/sunshihao.github.io';

const rm = (p) => fs.rmSync(p, { recursive: true, force: true });
const cp = (a, b) => {
  fs.mkdirSync(path.dirname(b), { recursive: true });
  fs.cpSync(a, b, { recursive: true });
};

for (const d of ['weekly', 'brief', 'media']) fs.mkdirSync(path.join(DATA, d), { recursive: true });

// 静态壳子（样式/脚本/品牌/评论配置）以现网站点为准
// 设计资产（CSS/JS/品牌/评论配置）：只在本地缺失时从旧站点播种一次。
// 之后以本项目 public/ 为准——否则每次构建都会把这里的改动覆盖掉。
const seed = (from, to) => {
  if (!fs.existsSync(to)) cp(from, to);
};
seed(path.join(SITE_SRC, 'assets/css'), path.join(PUBLIC, 'assets/css'));
seed(path.join(SITE_SRC, 'assets/js'), path.join(PUBLIC, 'assets/js'));
seed(path.join(SITE_SRC, 'assets/data/site.json'), path.join(PUBLIC, 'assets/data/site.json'));
seed(path.join(SITE_SRC, 'assets/img/brand'), path.join(PUBLIC, 'assets/img/brand'));

const issues = [];
for (const dir of fs.readdirSync(BRIEFS)) {
  const src = path.join(BRIEFS, dir);
  const mediaPath = path.join(src, 'media.json');
  const weeklyPath = path.join(src, 'weekly.md');
  if (!fs.existsSync(mediaPath) || !fs.existsSync(weeklyPath)) continue;

  const media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
  const id = media.issue || dir;
  const weekly = fs.readFileSync(weeklyPath, 'utf8');

  // 正文不放 markdown 图片行（配图由 media.json 注入），并去掉本机路径
  const clean = (s) =>
    s
      .split('\n')
      .filter((l) => !l.trimStart().startsWith('!['))
      .join('\n')
      .replace(/\/Users\/[^\s<)）]*/g, '本机目录')
      .replace(/同目录/g, '站内');

  const title = (weekly.match(/^#\s+(.+)$/m) || [, id])[1].trim();
  fs.writeFileSync(path.join(DATA, 'weekly', `${id}.md`), clean(weekly));
  if (fs.existsSync(path.join(src, 'brief.md'))) {
    fs.writeFileSync(path.join(DATA, 'brief', `${id}.md`), clean(fs.readFileSync(path.join(src, 'brief.md'), 'utf8')));
  }
  fs.writeFileSync(path.join(DATA, 'media', `${id}.json`), JSON.stringify(media, null, 1));

  // 图片：media.json 里写的是 assets/img/<id>/，按 id 落盘
  // 图片：先取期目录，再回落到已发布站点（历史期的图存在站点里）
  for (const base of [src, SITE_SRC]) {
    const imgSrc = path.join(base, 'assets/img', id);
    if (fs.existsSync(imgSrc)) cp(imgSrc, path.join(PUBLIC, 'assets/img', id));
  }

  // 交互总纲（原 index.html）与审计数据
  if (fs.existsSync(path.join(src, 'index.html'))) {
    cp(path.join(src, 'index.html'), path.join(PUBLIC, 'issues', id, 'dashboard.html'));
  }
  for (const f of ['entries.jsonl', 'ledger.all.json', 'themes.json', 'contract.json']) {
    const p = path.join(src, f);
    if (fs.existsSync(p)) cp(p, path.join(PUBLIC, 'issues', id, 'data', f));
  }
  // 正文落盘（逐字证据的原始页面），审计层要能点开
  if (fs.existsSync(path.join(src, 'pages'))) cp(path.join(src, 'pages'), path.join(PUBLIC, 'issues', id, 'data', 'pages'));

  issues.push({
    id,
    no: media.issue_no ?? null,
    title,
    date: media.date ?? '',
    summary: media.summary ?? '',
    stats: media.stats ?? '',
    cover: media.hero?.src ?? '',
    coverCredit: media.hero?.credit ?? '',
  });
}

issues.sort((a, b) => String(b.id).localeCompare(String(a.id)));
fs.writeFileSync(path.join(DATA, 'manifest.json'), JSON.stringify(issues, null, 1));
console.log(`synced ${issues.length} issue(s): ${issues.map((i) => i.id).join(', ')}`);
