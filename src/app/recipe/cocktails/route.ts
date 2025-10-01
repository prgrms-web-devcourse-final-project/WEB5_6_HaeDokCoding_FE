import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const size = searchParams.get('size') ?? '20';
  const lastId = searchParams.get('lastId');

  const upstream = new URL(`${process.env.BACKEND_URL}/cocktails`);
  upstream.searchParams.set('size', size);
  if (lastId) upstream.searchParams.set('lastId', lastId);

  const resp = await fetch(upstream.toString(), { cache: 'no-store' });
  if (!resp.ok) {
    return NextResponse.json({ message: 'upstream error' }, { status: resp.status });
  }
  const data = await resp.json(); // { code, message, data: [...] }
  return NextResponse.json(data);
}
