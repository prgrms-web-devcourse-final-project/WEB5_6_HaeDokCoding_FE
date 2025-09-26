import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { path } = await req.json(); // 클라이언트가 보내는 페이지 경로
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: 'preLoginPath',
    value: path,
    path: '/',
    maxAge: 60 * 30, // 30분
    httpOnly: false, // JS에서 읽을 수 있게
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return res;
}
