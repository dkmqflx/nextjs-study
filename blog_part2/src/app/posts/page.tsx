import FilterablePosts from '@/components/FilterablePosts';
import { getAllPosts } from '@/service/posts';
import { Metadata } from 'next';

// head 태그에서 아래 내용을 확인할 수 있다
export const metadata: Metadata = {
  title: 'All Posts',
  description: '풀스택 관련 블로그 글',
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return <FilterablePosts posts={posts} categories={categories} />;
}
