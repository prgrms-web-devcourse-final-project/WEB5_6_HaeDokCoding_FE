import CommentHeader from './CommentHeader';

function CommentList() {
  return (
    <ul aria-label="댓글 목록">
      <li>
        <article>
          <CommentHeader />
          <div>
            <p>정말 대단하시네요</p>
          </div>
        </article>
      </li>
    </ul>
  );
}

export default CommentList;
