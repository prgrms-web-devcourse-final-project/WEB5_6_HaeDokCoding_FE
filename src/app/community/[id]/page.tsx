import CommentList from '@/shared/components/community/detail/comment/CommentList';
import DetailComment from '@/shared/components/community/detail/comment/DetailComment';
import DetailContent from '@/shared/components/community/detail/DetailContent';
import DetailTitle from '@/shared/components/community/detail/DetailTitle';
import DetailHeader from '@/shared/components/community/detail/DetailHeader';
import DetailTabDesktop from '@/shared/components/community/detail/tab/DetailTabDesktop';
import StarBg from '@/shared/components/starBg/StarBg';

function Page() {
  return (
    <div className="w-full mb-10 flex relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <article className="page-layout max-w-824 flex-1">
        <DetailHeader />
        <DetailTitle />
        <DetailContent />
        <section className="mb-10">
          <DetailComment />
          <CommentList />
        </section>
      </article>
      <div className="hidden md:block">
        <DetailTabDesktop />
      </div>
    </div>
  );
}

export default Page;
