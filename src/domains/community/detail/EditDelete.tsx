function EditDelete({ use }: { use: 'post' | 'comment' }) {
  return (
    <div
      role="group"
      aria-label="게시글 수정 및 삭제"
      className="flex sm:gap-3 gap-1 sm:text-[14px] text-[12px] text-gray"
    >
      <button
        type="button"
        className={`hover:text-white transition-colors ${use === 'comment' ? ' underline underline-offset-4' : ''}`}
      >
        수정
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        className={`hover:text-white transition-colors ${use === 'comment' ? ' underline underline-offset-4' : ''}`}
      >
        삭제
      </button>
    </div>
  );
}

export default EditDelete;
