'use client';

import TagModal from '@/domains/community/write/cocktail-tag/TagModal';
import WriteSection from '@/domains/community/write/WriteSection';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { useParams } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  return (
    <div className="w-full mb-20 flex relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <div className="page-layout max-w-824 flex-1 z-5">
        <WriteSection setIsOpen={setIsOpen} mode="edit" postId={params.postId} />
      </div>
      {isOpen && <TagModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Page;
