import useFetchProfile from '@/domains/mypage/api/fetchProfile';
import SsuryImage from '@/domains/mypage/main/SsuryImage';
import { useEffect } from 'react';

type Props = {
  userNickname: string;
};

function Profile({ userNickname }: Props) {
  const { profile, fetchProfile } = useFetchProfile();
  useEffect(() => {
    fetchProfile();
  }, [profile?.abvLevel]);

  if (!profile) return;
  const { abvLevel } = profile;

  return (
    <div className="flex gap-2 items-center justify-start">
      <div
        className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
        aria-label="작성자 아이콘"
      >
        <div className="w-8 flex items-center justify-center">
          <SsuryImage abvLevel={abvLevel} />
        </div>
      </div>
      <span aria-label="작성자 이름" className="text-sm">
        {userNickname}
      </span>
    </div>
  );
}

export default Profile;
