'use client';

<<<<<<< HEAD
import Share from '@/domains/shared/share/Share';
import CommentBtn from '../../components/comment/CommentBtn';
import LikeBtn from '../../components/like/LikeBtn';
=======
import CommentBtn from '@/shared/components/comment/CommentBtn';
import LikeBtn from '@/shared/components/like/LikeBtn';
import Share from '@/shared/components/share/Share';
>>>>>>> 5754d67 ([docs] 폴더정리)

function DetailTabDesktop() {
  return (
    <section
      aria-label="게시글 인터랙션 버튼"
      className="absolute top-[50px] 2xl:right-80 xl:right-50 lg:right-10 md:right-10 z-10 h-full transition-transform duration-300 ease-in-out"
    >
      <div className="sticky top-[183px]">
        <div className="flex md:flex-col md:gap-10 w-full h-full">
          <div className="flex md:flex-col justify-center items-center gap-2 text-sm text-gray">
            <LikeBtn size="md" />
            <span>2</span>
          </div>
          <div className="flex md:flex-col justify-center items-center gap-2 text-sm text-gray">
            <CommentBtn size="md" />
            <span>2</span>
          </div>
          <div>
            <Share variants="community" size="md" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailTabDesktop;
