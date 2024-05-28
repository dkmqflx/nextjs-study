import { HomeUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  // follow 할 수 있는 함수를 추가해주었다.
  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );

  /**
   * api/me에서 불러오는 data:user, 즉 현재 사용자 밖에 없고
   * 우리가 데이터를 변경한 것은 현재 사용자와 targetId에 있는 사용자 정보도 변경을 해주었다
   * 그렇기 때문에 optimisticData를 사용하지 않고 그냥 me가 변경되었다고만 해
   *
   * 즉, /api/me의 mutate 다시 호출해서 user 상태가 업데이트 되기 때문에 굳이 optimisticData를 사용하지 않은 것 같음
   *
   * populateCache: false 로 둔 이유는 updateFollow가 리턴한 값으로 업데이트 하지 않고 싶기 때문
   */

  return { user, isLoading, error, setBookmark, toggleFollow };
}
