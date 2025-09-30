import React, { useEffect, useState } from 'react';
import CommentHeader from '../../shared/components/comment/CommentHeader';
import CommentList from '../../shared/components/comment/CommentList';
import { fetchComment } from '../api/fetchComment';
import { CommentType } from '../types/post';

type Props = {
  postId: number;
};

function Comment({ postId }: Props) {
  const [comments, setComments] = useState<CommentType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchComment(postId);
      if (!data) return;
      setComments(data);
    };
    fetchData();
  }, [postId]);

  return (
    <section className="mb-10 border-t-1 border-gray ">
      <CommentHeader postId={postId} comments={comments} setComments={setComments} />
      <CommentList comments={comments} />
    </section>
  );
}

export default Comment;
