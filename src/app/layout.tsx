import type { Metadata } from 'next';
import '@/shared/styles/global.css';
import { Toaster } from 'react-hot-toast';
import ScrollTopBtn from '@/shared/components/scrollTop/ScrollTopBtn';
import Header from '@/shared/components/header/Header';
import Footer from '@/shared/components/footer/Footer';
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
      <body className="relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mt-[60px]">
          <div id="observer-target" className="h-[0.5px]"></div>
          {children}
        </main>
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

        <ScrollTopBtn />
        <Footer />
      </body>
    </html>
  );
}
