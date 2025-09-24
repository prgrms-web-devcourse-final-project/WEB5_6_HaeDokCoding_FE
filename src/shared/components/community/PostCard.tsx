import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';
import PostLabel from './PostLabel';

function PostCard({ label }: { label: string }) {
  return (
    <article className="pt-[30] pb-3 border-b-1 border-gray-light">
      <PostLabel title={label} />

      <section className="flex items-start justify-between mt-3 cursor-pointer" role="link">
        <div className="flex flex-col gap-3">
          <p className="font-bold sm:text-xl text-lg">칵테일 만들 때 준비물</p>
          <div className="font-light sm:text-[15px] text-sm">
            <p>칵테일 처음 만들어 보는데 랄랄</p>
            <p>가나다라마바사아자차카파타하</p>
          </div>
          <ul
            className="flex font-light sm:gap-3 gap-1 sm:text-[14px] text-[12px] text-gray"
            aria-label="게시글 정보"
          >
            <li>실버븬</li>
            <li aria-hidden="true">|</li>
            <li>3분 전</li>
            <li aria-hidden="true">|</li>
            <li>조회 3</li>
            <li aria-hidden="true">|</li>
            <li>댓글 3</li>
          </ul>
        </div>
        <figure className="flex items-start">
          <Image
            src={prePost}
            alt="예비사진"
            width={120}
            height={120}
            className="md:w-[120px] sm:w-[100px] w-[80px] self-start"
          />
        </figure>
      </section>
    </article>
  );
}

export default PostCard;
