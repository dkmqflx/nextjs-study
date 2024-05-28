import { addBookmark, removeBookmark } from "@/service/user";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    // bookmark인 경우에는 !! 처리하지 않는 이유가 boolean 이기 때문
    // true이면 false가 되는 문제 생기기 때문에 undefined, null 동시에 처리하기 위해 조건문 아래처럼 선언해준다
    if (!id || bookmark == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
