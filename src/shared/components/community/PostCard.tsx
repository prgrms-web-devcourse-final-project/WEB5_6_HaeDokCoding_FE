import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';
import PostLabel from './PostLabel';

function PostCard() {
  return (
    <div className="pt-8 pb-3 border-b-1 border-gray-light">
      <PostLabel />
      <div className="flex sm:items-center justify-between sm:flex-row items-start flex-col gap-3">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-xl">칵테일 만들 때 준비물</h1>
          <div className="font-light">
            <p>칵테일 처음 만들어 보는데 랄랄</p>
            <p>가나다라마바사아자차카파타하</p>
          </div>
          <div className="flex font-light gap-3">
            <span>실버븬</span>
            <span>|</span>
            <span>3분 전</span>
            <span>|</span>
            <span>조회 3</span>
            <span>|</span>
            <span>댓글 3</span>
          </div>
        </div>
        <div>
          <Image src={prePost} alt="예비사진" width={150} height={150} />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
