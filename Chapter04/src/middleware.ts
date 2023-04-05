import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('미들웨어 실행중');
  // 페이지 이동할 때 마다 로그 찍힌다

  if (request.nextUrl.pathname.startsWith('/products/1004')) {
    console.log('미들웨어 경로를 리다이렉트');

    return NextResponse.redirect(new URL('/products', request.url));
  }
}

// 특정한 경로에만 미들웨어 실행할 수 있도록 한다
// 예를들어 contact 페이지로 이동하면 위 로그가 찍히지 않는다

export const config = {
  matcher: ['/products/:path*'],
};
