import SsuryImage from '@/domains/mypage/main/SsuryImage';
import { useAuthStore } from '@/domains/shared/store/auth';

type Props = {
  userNickname: string;
};

function Profile({ userNickname }: Props) {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="flex gap-2 items-center justify-start">
      <div className="w-8 h-8 flex items-center justify-center" aria-label="작성자 아이콘">
        <div className="w-8 flex items-center justify-center">
          <SsuryImage abvLevel={user.abv_degree || 5.0} />
        </div>
      </div>
      <span aria-label="작성자 이름" className="text-sm">
        {userNickname}
      </span>
    </div>
  );
}

export default Profile;
