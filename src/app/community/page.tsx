import Community from '@/domains/community/main/Community';
import PageHeader from '@/domains/shared/components/page-header/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 커뮤니티',
  description: '칵테일에 관한 모든 이야기',
};

function Page() {
  return (
    <div className="w-full">
      <PageHeader title="Community" description="칵테일에 관한 모든 이야기" />
      <div className="page-layout max-w-1024">
        <div className="mt-3 mb-10 flex flex-col gap-8 ">
          <section aria-labelledby="community-heading">
            <h1 id="community-heading" className="sr-only">
              커뮤니티 페이지
            </h1>
          </section>
          <Community />
        </div>
      </div>
    </div>
  );
}
export default Page;
