'use client';
import { Post } from '@/service/posts';
import { useState } from 'react';
import Categories from './Categories';
import PostsGrid from './PostsGrid';

type Props = {
  posts: Post[];
  categories: string[];
};
const ALL_POSTS = 'All Posts';

// 현재선택된 카테고리에 맞는 포스트를 부여준다
// 상태를 가지기 위해서 'use client'를 선언해준다

export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <section className='flex m-4'>
      <PostsGrid posts={filtered} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
        onClick={setSelected}
      />
    </section>
  );
}
