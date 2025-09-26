import CommentHeader from './CommentHeader';

function CommentList() {
  return (
    <ul aria-label="댓글 목록" className="flex flex-col mt-6">
      <li className="border-b-1 border-gray py-3">
        <article>
          <CommentHeader />
          <div className="mt-4">
            <p>정말 대단하시네요</p>
          </div>
        </article>
      </li>
      <li className="border-b-1 border-gray py-3">
        <article>
          <CommentHeader />
          <div className="mt-4">
            <p>정말 대단하시네요</p>
          </div>
        </article>
      </li>
    </ul>
  );
}

export default CommentList;
