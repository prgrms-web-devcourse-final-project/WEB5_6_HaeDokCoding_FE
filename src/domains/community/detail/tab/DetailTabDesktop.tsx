'use client';

import Share from '@/domains/shared/components/share/Share';
import CommentBtn from '../../components/comment/CommentBtn';
import LikeBtn from '../../components/like/LikeBtn';
import ShareModal from '@/domains/shared/components/share/ShareModal';
import { RefObject, useState } from 'react';

type Props = {
  likeCount: number;
  commentCount: number;
  commentRef: RefObject<HTMLElement | null>;
  like: boolean;
  onLikeToggle: () => void;
  title: string;
  imageUrls: string[];
};

interface Meta {
  title: string;
  imageUrl: string | undefined;
  url: string;
}

function DetailTabDesktop({
  likeCount,
  commentCount,
  commentRef,
  like,
  onLikeToggle,
  title,
  imageUrls,
}: Props) {
  const [isShare, setIsShare] = useState(false);
  const [meta, setMeta] = useState<Meta | null>(null);

  const handleClick = () => {
    if (commentRef.current) {
      const top = commentRef.current.getBoundingClientRect().top + window.scrollY - 100; // 100px 위로 offset
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // ✅ 공유 버튼 클릭 시 meta 생성
  const handleShareClick = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      setMeta({
        title,
        url: currentUrl,
        imageUrl: imageUrls[0] || getOgImage(),
      });
      setIsShare(true);
    }
  };

  // ✅ og:image 메타태그에서 이미지 가져오기 (fallback용)
  const getOgImage = (): string | undefined => {
    const ogImage = document.querySelector('meta[property="og:image"]');
    return ogImage?.getAttribute('content') || undefined;
  };

  return (
    <>
      <section
        aria-label="게시글 인터랙션 버튼"
        className="absolute top-[50px] 2xl:right-80 xl:right-50 lg:right-10 md:right-10 z-10 h-full transition-transform duration-300 ease-in-out"
      >
        <div className="sticky top-[183px]">
          <div className="flex md:flex-col md:gap-10 w-full h-full">
            <div className="flex md:flex-col justify-center items-center gap-2 text-sm text-gray">
              <LikeBtn size="md" onClick={onLikeToggle} isClick={like} />
              <span>{likeCount}</span>
            </div>
            <div className="flex md:flex-col justify-center items-center gap-2 text-sm text-gray">
              <CommentBtn size="md" onClick={handleClick} />
              <span>{commentCount}</span>
            </div>
            <div>
              <Share variants="community" size="md" onClick={handleShareClick} />
            </div>
          </div>
        </div>
      </section>
      {isShare && meta && (
        <ShareModal
          open={isShare}
          onClose={() => setIsShare(!isShare)}
          src={meta.imageUrl}
          title={meta.title}
          url={meta.url}
        />
      )}
    </>
  );
}

export default DetailTabDesktop;
