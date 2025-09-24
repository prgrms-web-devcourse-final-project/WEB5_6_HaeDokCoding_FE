import CommunityFilter from '@/shared/components/community/CommunityFilter';
import CommunityHeader from '@/shared/components/community/CommunityHeader';
import CommunityTab from '@/shared/components/community/CommunityTab';
import PostCard from '@/shared/components/community/PostCard';
import WriteBtn from '@/shared/components/community/WriteBtn';

function Page() {
  return (
    <main className="page-layout max-w-1024">
      <div className="mt-3 mb-10 flex flex-col gap-8 ">
        <section aria-labelledby="community-heading">
          <h1 id="community-heading" className="sr-only">
            커뮤니티 페이지
          </h1>
          <CommunityHeader />
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
    </main>
  );
}
export default Page;
