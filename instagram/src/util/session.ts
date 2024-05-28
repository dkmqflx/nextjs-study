import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { AuthUser } from "@/model/user";

// 유효한 세션인지 아닌지 검사한다
export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  // 유효한 세션인 경우에만 전달된 콜백함수가 실행되도록 한다
  return handler(user);
}
