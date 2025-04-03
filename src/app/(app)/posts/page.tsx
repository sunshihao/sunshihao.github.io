'use client';
import { Container } from '@/components/Container';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { allPosts, type Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import CoverSwitch from './CoverSwitch';
import { Tag } from './TagItem';

export interface PostItem {
	title: string;
	date: string;
	url: string;
	slug: string;
	tags: string[];
	description: string;
	author: string;
	cover?: string;
} // components/Tag.js

function PostCard({ post, showCover }: { post: Post; showCover?: boolean }) {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={cn(
				'text-violet-500 relative dark:text-violet-400',
				showCover ? 'hover:drop-shadow-2xl' : ' hover:text-violet-700'
			)}
		>
			{showCover && (
				<AspectRatio
					ratio={16 / 9}
					className="bg-muted absolute left-0 top-0 rounded-md overflow-hidden"
				>
					<Image
						unoptimized
						src={post.cover ?? ''}
						alt={post.title}
						fill
						className=" object-cover"
					/>
				</AspectRatio>
			)}
			<div className="px-4 py-4 rounded-sm border-b-[1px] border-violet-200 sm:border-none  cursor-pointer">
				<h2 className="mb-1 text-xl font-medium">
					<span>{post.title}</span>
				</h2>
				<div className="hidden sm:flex flex-wrap mt-2 justify-start  items-center space-x-4 text-sm">
					<time dateTime={post.date} className=" block text-xs text-gray-600">
						{dayjs(post.date).format('YYYY-MM-DD')}
					</time>
					<Separator orientation="vertical" className="h-5" />
					{post.tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>
			</div>
		</Link>
	);
}

export default function Posts() {
	const { t } = useTranslation();
	// 	{
	// 	searchParams
	// }: {
	// 	searchParams: { s: string };
	// 	}
	// const showCover = searchParams ? Boolean(Number(searchParams?.s)) : false;
	const sortedPosts = allPosts
		.sort((a, b) => {
			// 按照日期降序排序
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, allPosts.length - 1);
	return (
		<Container className="min-h-[50vh] mt-16">
			<header className="max-w-2xl mb-4">
				<div className="flex items-center ">
					<h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-xl">
						{t('blog.title', '我的博客d')} {/* 修改为正确的键名 */}
					</h1>
					<CoverSwitch />
				</div>
				<p className="mt-4 mb-6 text-base text-zinc-600 dark:text-zinc-400">
					{t('blog.description', '记录工作，学习，生活中的所见所闻所想，主要分享领域前端开发，偶尔也会记录其他内容')}
				</p>
			</header>
			<div className={cn('grid grid-cols-1 gap-4', false ? 'grid-cols-2' : '')}>
				{sortedPosts.map((post, idx) => (
					<PostCard showCover={false} key={idx} post={post} />
				))}
			</div>
		</Container>
	);
}
