// 构建后补齐 Pages 需要的文件（Jekyll 关闭、仓库说明）
import fs from 'node:fs';
import path from 'node:path';
const SITE = '/Users/ssh/sites/sunshihao.github.io';
const DIST = path.join(process.cwd(), 'dist');
for (const f of ['.nojekyll', 'README.md', 'STYLE.md']) {
  const src = path.join(SITE, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
}
console.log('finalize: .nojekyll / README / STYLE 已补齐');
