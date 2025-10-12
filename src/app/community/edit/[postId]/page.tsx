'use client';

import WriteSection from '@/domains/community/write/WriteSection';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { useParams } from 'next/navigation';

function Page() {
  const params = useParams();
  console.log(params);

  return (
    <div className="w-full mb-20 flex relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <div className="page-layout max-w-824 flex-1 z-5">
        <WriteSection mode="edit" postId={params.postId} />
      </div>
    </div>
  );
}

export default Page;
