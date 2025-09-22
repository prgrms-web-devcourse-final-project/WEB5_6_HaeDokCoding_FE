import type { Metadata } from 'next';
import '@/shared/styles/global.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/header/Header';
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
      <body>
        <Header />
        <main>{children}</main>
        <div id="modal-root"></div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              minWidth: '340px',
              background: 'transparent',
            },
          }}
        />
      </body>
    </html>
  );
}
