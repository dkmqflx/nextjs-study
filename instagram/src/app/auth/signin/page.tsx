import Signin from "@/components/Signin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

// 서버 컴포넌트
export default async function SignPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  // 현재 로그인을 했다면 리다이렉트 시켜준다
  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};
  //getProviders가 null일 수 도있기 때문에 그런 경우에는 빈 객체를 내려보낸다

  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
