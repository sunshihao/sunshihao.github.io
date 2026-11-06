// 构建后补齐 Pages 需要的文件
import fs from 'node:fs';
import path from 'node:path';
const DIST = path.join(process.cwd(), 'dist');
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
for (const f of ['README.md', 'STYLE.md']) {
  const src = path.join(process.cwd(), f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
}
console.log('finalize: .nojekyll / README / STYLE 已补齐');
