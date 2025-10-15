import '@/shared/styles/global.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import ScrollTopBtnWrapper from '@/shared/components/scroll-top/ScrollTopBtnWrapper';
import KaKaoScript from './api/kakao/KaKaoScript';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ClientInitHook from '@/domains/login/components/ClientInitHook';
import Provider from '@/shared/provider/Provider';

export const metadata: Metadata = {
  title: { default: 'SSOUL', template: 'SSOUL | %s' },
  metadataBase: new URL('http://www.ssoul.life'),
  description: '칵테일을 좋아하는 사람들을 위한 서비스',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className="relative flex flex-col min-h-full-screen">
        <Provider>
          <ClientInitHook />

          {children}

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
