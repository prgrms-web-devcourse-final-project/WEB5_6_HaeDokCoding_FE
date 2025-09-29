import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';

import PostInfo from '../components/postInfo/PostInfo';

import CocktailTag from '../components/tag/CocktailTag';
import DetailTabMobile from './tab/DetailTabMobile';

function DetailContent() {
  return (
    <section className="mt-5 flex flex-col items-start w-full gap-3 pb-10 relative">
      <figure className="flex items-center justify-center sm:justify-start mb-5 max-h-120">
        <Image src={prePost} alt="더미 이미지" height={600} className="sm:w-auto w-full" />
      </figure>
      <article className="flex flex-col gap-1 mb-5">
        <p>내용은 이거입니다 하하하</p>
        <p>그런가요 안녕하세요</p>
        <br />
        <p>글입니다다다다다다다다다다다다</p>
        <p>내용은 이거입니다 하하하</p>
        <p>그런가요 안녕하세요</p>
        <br />
        <p>글입니다다다다다다다다다다다다</p>
        <p>내용은 이거입니다 하하하</p>
        <p>그런가요 안녕하세요</p>
        <br />
        <p>글입니다다다다다다다다다다다다</p>
        <p>내용은 이거입니다 하하하</p>
        <p>그런가요 안녕하세요</p>
        <br />
        <p>글입니다다다다다다다다다다다다</p>
        <p>내용은 이거입니다 하하하</p>
        <p>그런가요 안녕하세요</p>
        <br />
        <p>글입니다다다다다다다다다다다다</p>
      </article>
      <CocktailTag use="detail" />
      <PostInfo />
      <div className="block md:hidden mt-2">
        <DetailTabMobile />
      </div>
    </section>
  );
}

export default DetailContent;
