import PostInfo from '../components/post-info/PostInfo';
import CocktailTag from '../components/tag/CocktailTag';
import DetailTabMobile from './tab/DetailTabMobile';
import ImageSlide from './ImageSlide';

type Props = {
  createdAt: string;
  viewCount: number;
  postId: number;
  tags: string[];
  content: string;
  likeCount: number;
  commentCount: number;
};

function DetailContent({ createdAt, viewCount, tags, content, likeCount, commentCount }: Props) {
  return (
    <section className="mt-5 flex flex-col items-start w-full gap-3 pb-10 relative">
      <ImageSlide />
      <article className="flex flex-col gap-1 mb-5 whitespace-pre-line">{content}</article>
      <CocktailTag use="detail" tags={tags} />
      <PostInfo createdAt={createdAt} viewCount={viewCount} commentCount={commentCount} />

      <div className="block md:hidden mt-2">
        <DetailTabMobile likeCount={likeCount} />
      </div>
    </section>
  );
}

export default DetailContent;
