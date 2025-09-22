import type { Metadata } from 'next';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'SSOUL',
  description: '칵테일을 좋아하는 사람들을 위한 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body>{children}</body>
    </html>
  );
}
