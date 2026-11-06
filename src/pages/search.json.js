import fs from 'node:fs';
import path from 'node:path';
import manifest from '../data/manifest.json';

const DATA = path.join(process.cwd(), 'src/data');

// markdown → 纯文本（保留段落换行，供搜索与摘要片段使用）
function plain(md = '') {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/^\s*[-: ]{3,}\s*$/gm, ' ')
    .replace(/[*_~]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

export function GET() {
  const issues = manifest.map((issue) => {
    const weekly = read(path.join(DATA, 'weekly', `${issue.id}.md`));
    const brief = read(path.join(DATA, 'brief', `${issue.id}.md`));
    return {
      id: issue.id,
      no: issue.no ?? null,
      title: issue.title,
      date: issue.date,
      summary: issue.summary || '',
      url: `/issues/${issue.id}/`,
      briefUrl: `/issues/${issue.id}/brief.html`,
      hasBrief: Boolean(brief),
      weekly: plain(weekly),
      brief: plain(brief),
    };
  });

  return new Response(JSON.stringify({ issues }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
