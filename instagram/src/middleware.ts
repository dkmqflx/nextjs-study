import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// api route 가기 전에 로그인한 사용자가 아니면 거절할 수 있도록 한다
// 서버까지 가서 세션이 있는지 확인하지 않고 미들웨어에서 로그인한 사용자가 있는지 확인한다

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // 토큰이 없고
  if (!token) {
    // api 요청이라면 에러처리를 해서 route handler 까지 도달하지 않도록 한다
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    }

    // 특정한 페이지를 전달받는다면

    const { pathname, search, origin, basePath } = req.nextUrl;

    const signInUrl = new URL(`${basePath}/auth/signin`, origin);

    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// 미들웨어를 검사하기 원하는 route handler
export const config = {
  matcher: [
    "/new",
    "/",
    "/api/bookmarks",
    "/api/comments",
    "/api/likes",
    "/api/follow",
    "/api/me",
    "/api/posts/:path*",
  ],
};

/**
 *
 * https://next-auth.js.org/configuration/nextjs
 *
 * 공식문서 있는대로만 next auth의 미들웨어를 사용 하면
 * 페이지에서만 동작한다
 * api에서도 확인하기를 원하기 때문에 github의 오픈소스 참고해서 위와 같이 작성해주었다.
 */
