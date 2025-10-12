import Button from '@/shared/components/button/Button';

type Props = {
  mode: 'edit' | 'create';
  setEditDone: (value: boolean) => void;
  handleEditLogic: () => Promise<boolean>;
};

function CompleteBtn({ mode, setEditDone, handleEditLogic }: Props) {
  return (
    <div className="w-full flex items-center justify-end mt-10">
      <Button
        type={mode === 'create' ? 'submit' : 'button'}
        size="default"
        color="default"
        onClick={async () => {
          const success = await handleEditLogic();
          if (success) {
            setEditDone(true);
          }
        }}
      >
        {mode === 'create' ? '올리기' : '수정하기'}
      </Button>
    </div>
  );
}

export default CompleteBtn;
