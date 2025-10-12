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
  prevLikeCount: number;
  commentCount: number;
  like: boolean;
  onLikeToggle: () => void;
  imageUrls: string[];
};

function DetailContent({
  createdAt,
  viewCount,
  tags,
  content,
  prevLikeCount,
  commentCount,
  like,
  imageUrls,
  onLikeToggle,
}: Props) {
  console.log(tags);
  return (
    <section className="mt-5 flex flex-col items-start w-full gap-3 pb-10 relative">
      <ImageSlide imageUrls={imageUrls} />
      <article className="flex flex-col gap-1 mb-5 whitespace-pre-line text-md mt-4">
        {content}
      </article>
      <CocktailTag use="detail" selectedTags={tags} />
      <PostInfo createdAt={createdAt} viewCount={viewCount} commentCount={commentCount} />

      <div className="block md:hidden mt-2">
        <DetailTabMobile likeCount={prevLikeCount ?? 0} like={like} onLikeToggle={onLikeToggle} />
      </div>
    </section>
  );
}

export default DetailContent;
