import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';

import PostInfo from '../components/post-info/PostInfo';
import CocktailTag from '../components/tag/CocktailTag';
import DetailTabMobile from './tab/DetailTabMobile';

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
      {}
      <figure className="flex items-center justify-center sm:justify-start mb-5 max-h-120">
        <Image src={prePost} alt="더미 이미지" height={600} className="sm:w-auto w-full" />
      </figure>
      <article className="flex flex-col gap-1 mb-5">{content}</article>
      <CocktailTag use="detail" tags={tags} />
      <PostInfo createdAt={createdAt} viewCount={viewCount} commentCount={commentCount} />

      <div className="block md:hidden mt-2">
        <DetailTabMobile likeCount={likeCount} />
      </div>
    </section>
  );
}

export default DetailContent;
