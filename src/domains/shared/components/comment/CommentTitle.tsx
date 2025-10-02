import EditDelete from '@/domains/community/detail/EditDelete';
import Profile from '@/domains/shared/components/profile/Profile';
import { elapsedTime } from '@/shared/utills/elapsedTime';

type Props = {
  userNickname: string;
  commentTime: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSubmitEdit: () => void;
  onDelete: () => void;
  isMyComment: boolean | null;
};

function CommentTitle({
  userNickname,
  commentTime,
  isEditing,
  onEdit,
  onCancelEdit,
  onSubmitEdit,
  onDelete,
  isMyComment,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Profile userNickname={userNickname} />
        <span className="md:text-sm text-[11px]">|</span>
        <p className="md:text-sm text-[11px] text-gray">{elapsedTime(commentTime)}</p>
      </div>
      {isMyComment && (
        <EditDelete
          use="comment"
          onSubmitEdit={onSubmitEdit}
          isEditing={isEditing}
          onEdit={onEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default CommentTitle;
