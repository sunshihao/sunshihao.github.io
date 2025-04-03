import { type Metadata } from 'next';

const title = '我的博客列表 | ';
const description =
  '记录在编程学习、工作中遇到的问题。我精心整理为技术博客文章合集，涵盖前端开发、React、Next.js等热门话题。发现实用的开发技巧、最佳实践和行业动态，提升您的开发技能。立即浏览最新文章！';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image'
  }
};

export default function PostsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}