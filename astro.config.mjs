import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// GitHub Pages 用户站：根路径；索引页输出 <dir>/index.html，审计页输出 brief.html（保持旧链接不变）
const briefAsHtml = {
  name: 'brief-as-html',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const dist = fileURLToPath(dir);
      const issues = path.join(dist, 'issues');
      if (!fs.existsSync(issues)) return;
      for (const id of fs.readdirSync(issues)) {
        const from = path.join(issues, id, 'brief', 'index.html');
        if (!fs.existsSync(from)) continue;
        fs.renameSync(from, path.join(issues, id, 'brief.html'));
        fs.rmSync(path.join(issues, id, 'brief'), { recursive: true, force: true });
      }
    },
  },
};

export default defineConfig({
  site: 'https://week.dhc.ink',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [briefAsHtml],
});
