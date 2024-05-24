"use client";
import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me"); // 클라이언트 컴포넌트 이므로 SWR 사용

  const showButton = loggedInUser && loggedInUser.username !== username;
  // 나의 페이지이면 버튼을 보여주지 않도록 한다

  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
}
