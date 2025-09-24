import Write from '@/shared/assets/icons/edit_28.svg';

function WriteBtn() {
  return (
    <button className="flex items-center justify-center py-1 px-2.5 bg-tertiary rounded-lg">
      <Write />
      글쓰기
    </button>
  );
}

export default WriteBtn;
