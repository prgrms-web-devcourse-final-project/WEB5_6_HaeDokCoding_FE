import FooterWrapper from '@/shared/components/footer/FooterWrapper';
import Header from '@/shared/components/header/Header';

function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="bg-transparent w-full h-[44px] md:h-[60px] flex items-center justify-between px-[12px] fixed top-0 left-0 z-50 transition-transform duration-200 ease-in-ou" />
      <main className="flex flex-1">{children}</main>
      <FooterWrapper />
    </>
  );
}
export default NoLayout;
