import CommentList from '@/shared/components/community/detail/comment/CommentList';
import DetailComment from '@/shared/components/community/detail/comment/DetailComment';
import DetailContent from '@/shared/components/community/detail/DetailContent';
import DetailTab from '@/shared/components/community/detail/DetailTab';
import DetailTitle from '@/shared/components/community/detail/DetailTitle';
import DetailHeader from '@/shared/components/community/detail/DetailHeader';

function Page() {
  return (
    <div className="w-full">
      <article className="page-layout max-w-824">
        <DetailHeader />
        <DetailTitle />
        <DetailContent />
        <section>
          <DetailComment />
          <CommentList />
        </section>
        <DetailTab />
      </article>
    </div>
  );
}

export default Page;
