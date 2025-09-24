import CommunityFilter from '@/shared/components/community/CommunityFilter';
import CommunityHeader from '@/shared/components/community/CommunityHeader';
import CommunityTab from '@/shared/components/community/CommunityTab';
import PostCard from '@/shared/components/community/PostCard';
import WriteBtn from '@/shared/components/community/WriteBtn';

function Page() {
  return (
    <div className="page-layout max-w-1024">
      <div className="mt-3 flex flex-col gap-8">
        <div>
          <CommunityHeader />
        </div>
        <div className="flex justify-between item-center sm:flex-row flex-col gap-4">
          <CommunityTab />
          <WriteBtn />
        </div>
        <div>
          <CommunityFilter />
          <PostCard />
        </div>
      </div>
    </div>
  );
}
export default Page;
