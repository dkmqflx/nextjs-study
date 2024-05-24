import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = { params: { username: string } };

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자) 보여준다
  // 하단: 3개의 탭 (posts, liked, bookmarks) 보여준다

  const user = await getUserForProfile(username);
  /**
   * 인스타그램 프로젝트 초반에 프론트엔드에서 직접 sanity의 데이터에 접근 하는 것이 아니라 백엔드(서버)를 거쳐서 가져와야한다고 했다.
   * 하지만 UserPage의 page.tsx는 서버 컴포넌트이기 때문에 별도의 api를 통해 가져오는 것이 아니라, 직접 바로 getUserProfile을 통해 직접 sanity 데이터에 접근해서 가져온다!
   * 즉, 서버 컴포넌트로 서버에서 실행되는 코드 이기 때문.
   */

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
}
