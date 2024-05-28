import { useCallback } from "react";
import { Comment, SimplePost } from "@/model/post";
import useSWR from "swr";
import { useCacheKeys } from "@/context/CacheKeysContext";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  // 상황에 따라 다른 cacheKey를 사용한다
  // 즉, 이제 PostGrid에서는 Provider에서 value로 전달받은 cacheKey를 사용하기 때문에
  // like 버튼을 클릭해도 정상적으로 업데이트가 되는 것

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, postComment };
}
