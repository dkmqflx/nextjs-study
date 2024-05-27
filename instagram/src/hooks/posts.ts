import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");
  // Bound Mutate를 사용한다
  // https://swr.vercel.app/docs/mutation

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts, // 즉각적으로 UI 업데이트를 먼저 해준다
      populateCache: false,
      revalidate: false,
      rollbackOnError: true, // 에러 발생하면 optimisticData로 업데이트한 것을 롤백한다
    });
    //

    /**
     * updateLike()가 반환한 값으로 bound된 mutate 즉, Post 데이터를 덮어씌워준다
     * 하지만 setLike를 업데이트할 때 Post 데이터를 사용할게 아니기 때문에 populateCache를 false로 한다
     * 즉, updateLike()가 반환한 값이 기존 Post 값을 덮어쓰지 않도록 처리해주었다.
     * 그 이유는 이미 optimisticData를 통해서 UI를 업데이트 해주었기 때문
     */
  };
  return { posts, isLoading, error, setLike };
}

/**
 * /api/likes 호출하고 응답을 받아온 다음 다시 mutate를 해야하기 때문에 응답이 느린 문제가 있었다.
 * -> optimistic ui update를 통해서 이를 해결한다
 */
