import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

/**
 * yarn build 해보며 아래 함수의 로그가 5번 찍히는 것을 알 수 있다
 * 여러 페이지에서 해당 함수를 호출하기 때문이다.
 * 만약 빌드할 때 호출하기 때문에 퍼포먼스 걱정 안해도 되지만,
 * SSR할 때 여러번 호출하면 문제가 될 수 있다
 * fetch는 자동으로 중복 제거가 되어 딱 한번만 호출되지만
 * 이렇게 DB에 접근하거나 파일에 읽는 함수는 함수 렌더링 될 때 여러번 호출하면 자동으로 중복 방지가 되지 않는다
 * 이를 개선하기 위해 리액트에서 제공하는 cache를 사용해서 아래처럼 함수를 정의해준다
 * https://beta.nextjs.org/docs/data-fetching/caching
 *
 * 이렇게 함수를 수정하면 호출하는 인자가 동일하다면 한번 호출이 된 이후에는 캐시된 값을 반환한다
 * 중요한 것은 한번 렌더링 되는 사이클에 한해서만 캐시 해준다
 * 한 페이지 렌더링 할 때 여러개 컴포넌트에서 동일한 함수 호출하는 경우에 캐시된 값 사용한다
 * 만약 다른 페이지 렌더링할 때 함수 호출하는 로직 있으면 이전 페이지에서 함수 호출 후 사용한 캐시된 값을 사용하는 것이 아니라
 * 다시 함수 호출하고, 이 때 다른 컴포넌트에서 또 호출하면 캐시된 값을 반환하는 것
 * 이렇게 수정 후 다시 yarn build 하믄 로그 세번찍히는데
 * 이전에는 3개의 페이지에서 2/2/1 번 이렇게 호출되었다면
 * 이번에는 3개의 페이지에서 1/1/1 번만 호출하는 것이다
 * 지금처럼 모든 페이지 SSG인 경우에는 큰 영향 없지만 SSR 인 경우에는 페이지 로딩 성능에 효과 볼 수 있다
 */

export const getAllPosts = cache(async () => {
  console.log("getAllPosts");
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const content = await readFile(filePath, "utf-8");

  // post: 메타 데이터
  // content: 해당 포스트에 해당하는 content
  // next, prev: 메타 데이터
  return { ...post, content, next, prev };
}
