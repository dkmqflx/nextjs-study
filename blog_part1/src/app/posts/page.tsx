import FilterablePosts from '@/components/FilterablePosts';
import { getAllPosts } from '@/service/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  // set을 통해서 중복된 카테고리들을 없애준다
  const categories = [...new Set(posts.map((post) => post.category))];
  return <FilterablePosts posts={posts} categories={categories} />;
}
