'use client';

import CommentBtn from '../../comment/CommentBtn';
import LikeBtn from '../../like/LikeBtn';
import Share from '../../share/Share';

function DetailTab() {
  return (
    <section aria-label="게시글 인터랙션 버튼" className="flex flex-col sm:block hidden gap-2">
      <LikeBtn />
      <CommentBtn />
      <Share variants="community" />
    </section>
  );
}

export default DetailTab;
