import { readFile } from 'fs/promises';
import path from 'path';

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & { content: string };

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json'); // process.cwd : 절대경로
  return readFile(filePath, 'utf-8') // utf-8은 인코딩 방법
    .then<Post[]>(JSON.parse) // data => JSON.parse(data) 처럼 전달되는 인자 같으면 생략가능
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1))); // 날짜형태로, 최신 포스트 가장 먼저 오도록 정렬
}

// 인자로 전달된 fileName을 통해서 해당 파일을 읽어온다
export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const metadata = await getAllPosts() //
    .then((posts) => posts.find((post) => post.path === fileName));
  if (!metadata)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  const content = await readFile(filePath, 'utf-8');
  return { ...metadata, content };
}
