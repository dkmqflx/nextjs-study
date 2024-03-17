import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// SSR로 빌드 된다
// 사용자로 요청이 왔을 때, getServerSession 을 통해 로그인한 사용자의 정보를 받아오기 때문
export default async function HomePage() {
  const session = await getServerSession(authOptions); // 서버 컴포넌트이므로 getServerSession 함수로 세션 정보 가져온다
  const user = session?.user; // 로그인한 사용자인 정보인 session을 통해서 가져온다

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4 min-w-0">
        {/* 
        FollowingBar와 PostList에서 필요한 데이터는 
        로그인한 사용자의 세션정보를 통해서 누구를 팔로우 했는지, 포스트가 무엇인지를 알기 힘들다

        그렇기 때문에 해당 컴포넌트들에서 필요한 데이터를 
        SSR로 또는 CSR로 받아와야 한다 
        
        팔로잉바와 포스트리스트 까지 데이터를 받아오는 것을 SSR로 처리하면
        서버에 부하가 커질 수 있기 때문에 Navbar와 Sidebar는 SSR로 처리하되,

        팔로잉바와 포스트리스트는 클라이언트 컴포넌트로 만든다 
        그리고 이렇게 클라이언트 컴포넌트로 만들어도 
        컴포넌트 내부적으로 최대한 골격이나 정적인 부분은 pre render 된다.
        이렇게 우선 만들더라도 이후에 성능 측정 같은 것을 통해 다르게 리팩토링할 수 있다.
        */}
        <FollowingBar />
        <PostList />
      </div>

      <div className="basis-1/4 ml-8">
        <SideBar user={user} />
      </div>
    </section>
  );
}
