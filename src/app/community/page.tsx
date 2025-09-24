import CommunityFilter from '@/shared/components/community/CommunityFilter';
import CommunityTab from '@/shared/components/community/CommunityTab';
import PostCard from '@/shared/components/community/PostCard';
import WriteBtn from '@/shared/components/community/WriteBtn';
import PageHeader from '@/shared/components/pageHeader/PageHeader';
import headerImg from '@/shared/assets/images/community_page_header.webp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '커뮤니티',
  description: '칵테일에 관한 모든 이야기',
};

function Page() {
  return (
    <div className="w-full">
      <PageHeader src={headerImg} title="Community" description="칵테일에 관한 모든 이야기" />
      <div className="page-layout max-w-1024">
        <div className="mt-3 mb-10 flex flex-col gap-8 ">
          <section aria-labelledby="community-heading">
            <h1 id="community-heading" className="sr-only">
              커뮤니티 페이지
            </h1>
          </section>

          <section
            aria-label="탭과 글쓰기"
            className="flex justify-between item-center sm:flex-row flex-col gap-4 mt-1"
          >
            <CommunityTab />
            <WriteBtn />
          </section>

          <section aria-label="게시물 목록">
            <CommunityFilter />
            <PostCard label="레시피" />
            <PostCard label="팁" />
            <PostCard label="질문" />
            <PostCard label="자유" />
          </section>
        </div>
      </div>
    </div>
  );
}
export default Page;
