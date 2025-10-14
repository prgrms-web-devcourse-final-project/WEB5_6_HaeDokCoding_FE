// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  const PUBLIC_PATHS = ['/', '/login', '/community', '/recipe', '/recommend'];

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 로그인한 사용자가 로그인 페이지 접근 → 홈으로
  if (authCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 공개 경로가 아니면 로그인 필요
  if (!authCookie && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
