import Button from '@/shared/components/button/Button';

type Props = {
  mode: 'edit' | 'create';
  setEditDone: (value: boolean) => void;
  isLoading?: boolean;
};

function CompleteBtn({ mode, setEditDone, isLoading = false }: Props) {
  return (
    <div className="w-full flex items-center justify-end mt-10">
      <Button
        type={mode === 'create' ? 'submit' : 'button'}
        size="default"
        color="default"
        disabled={isLoading}
        onClick={async () => {
          setEditDone(true);
        }}
      >
        {isLoading
          ? mode === 'create'
            ? '올리는 중...'
            : '수정 중...'
          : mode === 'create'
            ? '올리기'
            : '수정하기'}
      </Button>
    </div>
  );
}

export default CompleteBtn;
