import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

// 이렇게 선언해주어야지 요청을 올 때 마다 아래 Router를 다이나믹하게 수행하도록 한다
export const dynamic = "force-dynamic";

// 별도로 request 전달받지 않고 항상 동일한 함수를 호출하므로 static 하다
export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
