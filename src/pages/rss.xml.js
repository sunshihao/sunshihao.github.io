import manifest from '../data/manifest.json';
import { SITE } from '../lib/render.mjs';

const FEED = {
  title: '见闻周刊',
  description: '每周一期的硬来源新闻周刊：60 条，正文 18 条，数字可在原文核对。',
  link: `${SITE}/`,
  self: `${SITE}/rss.xml`,
};

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// 每期在发布日（周五）上午 10 点（Asia/Shanghai）上线
const pubDate = (issue) => {
  const d = new Date(`${issue.date}T10:00:00+08:00`);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};

export function GET() {
  const issues = [...manifest].sort((a, b) => pubDate(b) - pubDate(a));
  const lastBuild = issues.length ? pubDate(issues[0]) : new Date();

  const items = issues
    .map((issue) => {
      const url = `${SITE}/issues/${issue.id}/`;
      const summary = [issue.summary, issue.stats].filter(Boolean).join('　');
      return `<item>
<title>${esc(issue.title)}</title>
<link>${esc(url)}</link>
<guid isPermaLink="true">${esc(url)}</guid>
<pubDate>${pubDate(issue).toUTCString()}</pubDate>
<description>${esc(summary)}</description>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(FEED.title)}</title>
<link>${esc(FEED.link)}</link>
<description>${esc(FEED.description)}</description>
<language>zh-CN</language>
<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
<atom:link href="${esc(FEED.self)}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
