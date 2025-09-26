import EditDelete from '@/domains/community/detail/EditDelete';
import Profile from '@/domains/community/detail/Profile';

function CommentTitle() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Profile />
        <span className="text-sm">|</span>
        <p className="text-sm text-gray">3분 전</p>
      </div>
      <EditDelete use="comment" />
    </div>
  );
}

export default CommentTitle;
