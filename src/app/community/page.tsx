import CommunityFilter from '@/shared/components/community/CommunityFilter';
import CommunityHeader from '@/shared/components/community/CommunityHeader';
import CommunityTab from '@/shared/components/community/CommunityTab';
import PostCard from '@/shared/components/community/PostCard';
import WriteBtn from '@/shared/components/community/WriteBtn';

function Page() {
  return (
    <div className="page-layout max-w-1024">
      <div className="mt-3 mb-10 flex flex-col gap-8 ">
        <div>
          <CommunityHeader />
        </div>
        <div className="flex justify-between item-center sm:flex-row flex-col gap-4 mt-1">
          <CommunityTab />
          <WriteBtn />
        </div>
        <div>
          <CommunityFilter />
          <PostCard label="레시피" />
          <PostCard label="팁" />
          <PostCard label="질문" />
          <PostCard label="자유" />
        </div>
      </div>
    </div>
  );
}
export default Page;
