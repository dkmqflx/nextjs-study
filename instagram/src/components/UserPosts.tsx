"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";

type Props = {
  user: ProfileUser;
};
export default function UserPosts({ user: { username } }: Props) {
  // 어떤 탭이 선택되었느냐에 따라 다른 정보를 보여주도록 한다
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/saved
  const [tab, setTab] = useState("saved");

  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts);

  return <></>;
}
