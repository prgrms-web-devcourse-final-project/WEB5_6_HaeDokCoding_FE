'use client';

import Share from '@/domains/shared/components/share/Share';
import LikeBtn from '../../components/like/LikeBtn';
import { useState } from 'react';
import ShareModal from '@/domains/shared/components/share/ShareModal';
import { useParams } from 'next/navigation';

type Props = {
  likeCount: number;
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

function DetailTabMobile({ likeCount, onLikeToggle, like, title, imageUrls }: Props) {
  const [isShare, setIsShare] = useState(false);
  const [meta, setMeta] = useState<Meta | null>(null);

  const params = useParams();
  const postId = params?.id;

  const handleShareClick = () => {
    const currentUrl = `http://www.ssoul.life/community/${postId}`;
    setMeta({
      title,
      url: currentUrl,
      imageUrl: imageUrls[0] || getOgImage(),
    });
    setIsShare(true);
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
        className="absolute w-full bottom-5 left-0 transition-transform duration-150"
      >
        <div className="flex w-full h-full justify-start items-center gap-3">
          <div className="flex justify-center w-auto items-center gap-1 text-sm text-gray">
            <LikeBtn size="sm" isClick={like} onClick={onLikeToggle} />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center">
            <Share variants="community" size="sm" onClick={handleShareClick} />
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

export default DetailTabMobile;
