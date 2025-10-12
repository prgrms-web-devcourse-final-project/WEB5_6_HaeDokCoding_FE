import Button from '@/shared/components/button/Button';

function CompleteBtn({ mode }: { mode: 'edit' | 'create' }) {
  return (
    <div className="w-full flex items-center justify-end mt-10">
      <Button type="submit" size="default" color="default">
        {mode === 'create' ? '올리기' : '수정하기'}
      </Button>
    </div>
  );
}

export default CompleteBtn;
