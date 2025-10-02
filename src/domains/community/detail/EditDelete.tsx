type Props = {
  use: 'post' | 'comment';
  isEditing?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onDelete?: () => void;
  onSubmitEdit?: () => void;
};

function EditDelete({ use, isEditing, onEdit, onCancelEdit, onDelete, onSubmitEdit }: Props) {
  return (
    <div
      role="group"
      aria-label="게시글 수정 및 삭제"
      className="flex sm:gap-3 gap-1 sm:text-[14px] text-[12px] text-gray"
    >
      <button
        type="button"
        className={`hover:text-white transition-colors ${use === 'comment' ? ' underline underline-offset-4' : ''}`}
        onClick={isEditing ? onCancelEdit : onEdit}
      >
        {isEditing ? '취소' : '수정'}
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        className={`hover:text-white transition-colors ${use === 'comment' ? ' underline underline-offset-4' : ''}`}
        onClick={isEditing ? onSubmitEdit : onDelete}
      >
        {isEditing ? '완료' : '삭제'}
      </button>
    </div>
  );
}

export default EditDelete;
