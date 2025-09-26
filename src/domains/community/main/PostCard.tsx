import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';

import PostInfo from './PostInfo';
import Label from '@/domains/shared/components/label/Label';

function PostCard({ label }: { label: string }) {
  return (
    <article className="pt-[30] pb-3 border-b-1 border-gray-light">
      <Label title={label} />

      <section className="flex items-start justify-between mt-3 cursor-pointer" role="link">
        <div className="flex flex-col gap-3">
          <p className="font-bold sm:text-xl text-lg">칵테일 만들 때 준비물</p>
          <div className="font-light sm:text-[15px] text-sm">
            <p>칵테일 처음 만들어 보는데 랄랄</p>
            <p>가나다라마바사아자차카파타하</p>
          </div>
          <PostInfo hasUserName={true} />
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
