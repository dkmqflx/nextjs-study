import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = { params: { username: string } };

// generateMetadata에서 getUserForProfile 함수를 호출하고
// 페이지 렌더링될 때도 getUserForProfile 함수가 또 호출되기 때문에
// 한번 렌더링 되는 사이클 내에서 여러번 호출하지 않고 한번만 사용하려면 cache를 사용하면 된다
// 전달되는 username이 변경되지 않으면 동일한, 캐시된 결과를 사용하도록 한다
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

// dynamic route의 메타데이터를 만들기 때문에 아래처럼 처리
export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.username}) · Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
