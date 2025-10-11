import type { Metadata } from 'next';
import '@/shared/styles/global.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/shared/components/header/Header';
import FooterWrapper from '@/shared/components/footer/FooterWrapper';
import ScrollTopBtnWrapper from '@/shared/components/scroll-top/ScrollTopBtnWrapper';
import KaKaoScript from './api/kakao/KaKaoScript';
import IdleHandler from '@/domains/login/components/IdleHandler';
import Provider from '@/shared/api/Provider';


export const metadata: Metadata = {
  title: { default: 'SSOUL', template: 'SSOUL | %s' },
  metadataBase: new URL('http://www.ssoul.life'),
  description: '칵테일을 좋아하는 사람들을 위한 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className="relative flex flex-col min-h-screen">
        <Provider>
          <Header />
          <IdleHandler />
          <main className="flex flex-1 pt-[2.75rem] md:pt-[3.75rem]">{children}</main>
          <FooterWrapper />

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

          <ScrollTopBtnWrapper />
        </Provider>
      </body>
      <KaKaoScript />
    </html>
  );
}
