#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CSS = path.join(process.cwd(), 'public/assets/css/site.css');
export const cssVersion = fs.existsSync(CSS)
  ? crypto.createHash('md5').update(fs.readFileSync(CSS)).digest('hex').slice(0, 8)
  : '0';

export const SITE = 'https://week.dhc.ink';
export const CAT_COLOR = {
  政治: '--c-politics',
  财经: '--c-markets',
  科技: '--c-tech',
  AI: '--c-ai',
  国内股市: '--c-cn',
  期货与商品: '--c-fut',
  期货与大宗: '--c-fut',
};

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function sectionHead(key, color) {
  return `<div class="section-head"><span class="dot" style="background:var(${color})"></span><h2>${esc(key)}</h2></div>`;
}

export function figure(src, caption, credit, link) {
  const cap = `${esc(caption)}　图：<a href="${esc(link || '#')}" target="_blank" rel="noopener">${esc(credit)}</a>`;
  return `<figure><img src="${esc(src)}" alt="${esc(caption)}"><figcaption>${cap}</figcaption></figure>`;
}

export function numcard(big, unit, label, note, cat, color) {
  const unitX = 40 + Math.max(String(big).length * 62, 150);
  return `<div class="numcard">
<svg viewBox="0 0 800 250" role="img" aria-label="${esc(label)}">
  <rect width="800" height="250" fill="var(--bg-soft)"/>
  <text x="40" y="56" font-size="15" letter-spacing="1.5" fill="var(--muted)" font-family="inherit">${esc(cat.toUpperCase())} · ${esc(label)}</text>
  <text x="38" y="168" font-size="92" font-weight="700" fill="var(${color})" font-family="inherit">${esc(big)}</text>
  <text x="${unitX}" y="168" font-size="30" fill="var(--fg-soft)" font-family="inherit">${esc(unit)}</text>
  <text x="40" y="215" font-size="17" fill="var(--fg-soft)" font-family="inherit">${esc(note)}</text>
</svg></div>`;
}

export function heroFigure(hero) {
  if (!hero) return '';
  return `<figure class="hero"><img src="/${esc(hero.src)}" alt="${esc(hero.caption)}"><figcaption>${esc(
    hero.caption
  )}　图：<a href="${esc(hero.link || '#')}" target="_blank" rel="noopener">${esc(hero.credit)}</a></figcaption></figure>`;
}

export function galleryCards(items = []) {
  if (!items.length) return '';
  const cards = items
    .map(
      (g) => `<div class="card"><div class="thumb"><img src="/${esc(g.src)}" alt="">
<div class="body"><div class="sub">${esc(g.caption)}</div>
<div class="sub">图：<a href="${esc(g.link || '#')}" target="_blank" rel="noopener">${esc(g.credit)}</a></div></div></div></div>`
    )
    .join('\n');
  return sectionHead('本周图片', '--accent') + `<div class="cards gallery">${cards}</div>`;
}

const H2 = /(<h2>[^<]*<\/h2>)/;

export function injectMedia(html, media) {
  const gallery = (media.gallery || []).filter(
    (g) => g?.src && !Object.values(media.sections || {}).some((s) => s?.src === g.src)
  );
  const parts = html.split(H2);
  let out = '';
  for (const part of parts) {
    const m = part.match(/^<h2>([^<]*)<\/h2>$/);
    if (!m) {
      out += part;
      continue;
    }
    const key = m[1].trim();
    const color = CAT_COLOR[key] || '--accent';
    if (key === '政治') out += galleryCards(gallery);
    out += sectionHead(key, color);
    const s = media.sections?.[key] || media.sections?.[key.replace(/^(国外|国内)/, '')];
    if (s) {
      out +=
        s.type === 'numcard'
          ? numcard(s.big, s.unit || '', s.label || '', s.note || '', key, color)
          : s.src
            ? figure('/' + s.src, s.caption || '', s.credit || '', s.link)
            : '';
    }
  }
  return out;
}
