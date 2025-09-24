import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';
import PostLabel from './PostLabel';

function PostCard({ label }: { label: string }) {
  return (
    <div className="pt-12 pb-3 border-b-1 border-gray-light">
      <PostLabel title={label} />
      <div className="flex items-start justify-between mt-3 cursor-pointer">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold sm:text-xl text-lg">칵테일 만들 때 준비물</h1>
          <div className="font-light sm:text-[15px] text-sm">
            <p>칵테일 처음 만들어 보는데 랄랄</p>
            <p>가나다라마바사아자차카파타하</p>
          </div>
          <div className="flex font-light sm:gap-3 gap-1 sm:text-[14px] text-[12px] text-gray">
            <span>실버븬</span>
            <span>|</span>
            <span>3분 전</span>
            <span>|</span>
            <span>조회 3</span>
            <span>|</span>
            <span>댓글 3</span>
          </div>
        </div>
        <div className="flex items-start">
          <Image
            src={prePost}
            alt="예비사진"
            width={120}
            height={120}
            className="md:w-[120px] sm:w-[100px] w-[80px] self-start"
          />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
