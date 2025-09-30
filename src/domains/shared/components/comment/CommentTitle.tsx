import EditDelete from '@/domains/community/detail/EditDelete';
import Profile from '@/domains/shared/components/profile/Profile';

type Props = {
  userNickname: string;
};

function CommentTitle({ userNickname }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Profile userNickname={userNickname} />
        <span className="text-sm">|</span>
        <p className="text-sm text-gray">3분 전</p>
      </div>
      <EditDelete use="comment" />
    </div>
  );
}

export default CommentTitle;
