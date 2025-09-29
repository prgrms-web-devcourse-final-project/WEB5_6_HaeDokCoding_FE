import DetailContent from '@/domains/community/detail/DetailContent';
import DetailHeader from '@/domains/community/detail/DetailHeader';
import DetailTitle from '@/domains/community/detail/DetailTitle';
import DetailTabDesktop from '@/domains/community/detail/tab/DetailTabDesktop';
import Comment from '@/domains/shared/components/comment/Comment';
import CommentList from '@/domains/shared/components/comment/CommentList';
import StarBg from '@/domains/shared/components/star-bg/StarBg';

function Page() {
  return (
    <div className="w-full mb-10 flex relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <article className="page-layout max-w-824 flex-1 z-5">
        <DetailHeader />
        <DetailTitle />
        <DetailContent />
        <section className="mb-10">
          <Comment />
        </section>
      </article>
      <div className="hidden md:block">
        <DetailTabDesktop />
      </div>
    </div>
  );
}

export default Page;
