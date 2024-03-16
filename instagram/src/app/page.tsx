import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions); // 서버 컴포넌트이므로 getServerSession 함수로 세션 정보 가져온다
  const user = session?.user; // 로그인한 사용자인 정보인 session을 통해서 가져온다

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>

      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}
