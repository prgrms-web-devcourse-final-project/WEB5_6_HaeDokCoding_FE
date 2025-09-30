import { CommentType } from '@/domains/community/types/post';
import CommentTitle from './CommentTitle';

type Props = {
  comments: CommentType[] | null;
};

function CommentList({ comments }: Props) {
  return (
    <ul aria-label="댓글 목록" className="flex flex-col mt-6">
      {comments &&
        comments.map(({ commentId, content, userNickName }) => (
          <li className="border-b-1 border-gray py-3" key={commentId}>
            <article>
              <CommentTitle userNickname={userNickName} />
              <div className="mt-4">
                <p>{content}</p>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
