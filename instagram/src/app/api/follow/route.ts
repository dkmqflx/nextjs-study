import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { follow, unfollow } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// 기존 사용자의 정보를 업데이트 하기 때문에 PUT
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
