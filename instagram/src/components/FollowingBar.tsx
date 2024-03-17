"use client";
import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR("/api/me");
  console.log("data", data);
  return <p>FollowingBar</p>;
}

// 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 를 통해 사용자의 정보를 얻어온다
// 로그인이 성공하면 서버로부터 응답 헤더에 로그인 토큰을 받아온다
// 로그인이 한번 성립되면, 그 클라이언트가 서버에 보내는 요청에 대해서는
// 헤더에 자동으로 토큰이 붙어져서 보내지기 때문에 굳이 요청하는 body에 사용자 정보를 보내줄 필요가 없다
// 서버는 이러한 토큰을 통해서 판단하게 된다

// 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
// 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 온다
// 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌
// (image, username)

// 실제로 me라는 요청의 request header를 보면 next-auth.csrf-로 시작하는 쿠키가 있는 것을 확인할 수 있다
