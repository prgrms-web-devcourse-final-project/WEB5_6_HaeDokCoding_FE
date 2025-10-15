import ClientInitHook from '@/domains/login/components/ClientInitHook';
import FooterWrapper from '@/shared/components/footer/FooterWrapper';
import Header from '@/shared/components/header/Header';

function LayoutWithHeaderFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ClientInitHook />
      <main className="flex flex-1 pt-[2.75rem] md:pt-[3.75rem]">{children}</main>
      <FooterWrapper />
    </>
  );
}
export default LayoutWithHeaderFooter;
