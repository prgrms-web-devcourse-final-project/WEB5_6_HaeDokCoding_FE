import React from 'react';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';

function Comment() {
  return (
    <section className="mb-10 border-t-1 border-gray ">
      <CommentHeader />
      <CommentList />
    </section>
  );
}

export default Comment;
