#!/usr/bin/env node
// 把 /Users/ssh/briefs/week/<期号>/ 的产物同步进 Astro 项目：md、media、图片、审计数据、dashboard。
// 目录名即期号（YYYYMMDD-YYYYMMDD）；历史期号改名用 LEGACY 映射兜底，并生成旧 URL 跳转页。
import fs from 'node:fs';
import path from 'node:path';

const BRIEFS = '/Users/ssh/briefs/week';
const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, 'src/data');
const PUBLIC = path.join(ROOT, 'public');
const SITE_SRC = '/Users/ssh/sites/sunshihao.github.io';

// 改名前的旧期号 → 新期号
const LEGACY = { '2026-10-30-1023-1029': '20261023-20261029' };

const rm = (p) => fs.rmSync(p, { recursive: true, force: true });
const cp = (a, b) => {
  fs.mkdirSync(path.dirname(b), { recursive: true });
  fs.cpSync(a, b, { recursive: true });
};

// 设计资产（CSS/JS/品牌/评论配置）：只在本地缺失时从旧站点播种一次
const seed = (from, to) => {
  if (!fs.existsSync(to)) cp(from, to);
};
seed(path.join(SITE_SRC, 'assets/css'), path.join(PUBLIC, 'assets/css'));
seed(path.join(SITE_SRC, 'assets/js'), path.join(PUBLIC, 'assets/js'));
seed(path.join(SITE_SRC, 'assets/data/site.json'), path.join(PUBLIC, 'assets/data/site.json'));
seed(path.join(SITE_SRC, 'assets/img/brand'), path.join(PUBLIC, 'assets/img/brand'));

if (!fs.existsSync(BRIEFS)) {
  console.log(`没有 ${BRIEFS}（CI 环境），沿用仓库里已提交的 src/data 与 public/`);
  process.exit(0);
}

// 生成物每次重建，避免改名后的旧目录残留
for (const d of ['weekly', 'brief', 'media']) rm(path.join(DATA, d));
rm(path.join(PUBLIC, 'issues'));
for (const d of ['weekly', 'brief', 'media']) fs.mkdirSync(path.join(DATA, d), { recursive: true });
fs.mkdirSync(path.join(PUBLIC, 'issues'), { recursive: true });

const issues = [];

for (const dir of fs.readdirSync(BRIEFS)) {
  const src = path.join(BRIEFS, dir);
  if (!fs.statSync(src).isDirectory()) continue;
  const mediaPath = path.join(src, 'media.json');
  const weeklyPath = path.join(src, 'weekly.md');
  if (!fs.existsSync(mediaPath) || !fs.existsSync(weeklyPath)) continue;

  const id = dir; // 目录名即期号
  let media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
  const weekly = fs.readFileSync(weeklyPath, 'utf8');

  // 老期号改名后，把 media 里的图片路径改到新期号目录
  for (const [oldId, newId] of Object.entries(LEGACY)) {
    if (newId === id) {
      media = JSON.parse(JSON.stringify(media).replaceAll(`assets/img/${oldId}/`, `assets/img/${newId}/`));
    }
  }
  media.issue = id;

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

  // 图片：本期目录 → 旧站点同名目录 → 旧期号目录
  const imgTargets = [path.join(src, 'assets/img', id), path.join(SITE_SRC, 'assets/img', id)];
  for (const [oldId, newId] of Object.entries(LEGACY)) {
    if (newId === id) {
      imgTargets.push(
        path.join(src, 'assets/img', oldId),
        path.join(SITE_SRC, 'assets/img', oldId),
        path.join(PUBLIC, 'assets/img', oldId) // 旧图可能只在 public 里
      );
    }
  }
  for (const p of imgTargets) if (fs.existsSync(p)) cp(p, path.join(PUBLIC, 'assets/img', id));

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

// 旧期号 URL → 新期号，留住外链
for (const [oldId, newId] of Object.entries(LEGACY)) {
  const dir = path.join(PUBLIC, 'issues', oldId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>已迁移到 ${newId}</title>
<link rel="canonical" href="/issues/${newId}/">
<meta http-equiv="refresh" content="0; url=/issues/${newId}/">
</head><body><p>这一期已迁移到 <a href="/issues/${newId}/">/issues/${newId}/</a>。</p></body></html>`
  );
}

issues.sort((a, b) => String(b.id).localeCompare(String(a.id)));
fs.writeFileSync(path.join(DATA, 'manifest.json'), JSON.stringify(issues, null, 1));
console.log(`synced ${issues.length} issue(s): ${issues.map((i) => i.id).join(', ')}`);
