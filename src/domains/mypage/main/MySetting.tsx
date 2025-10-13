'use client';
import EditNickName from '@/domains/mypage/components/EditNickName';
import ToggleBtn from '@/domains/mypage/components/ToggleBtn';
import WithdrawModal from '@/domains/mypage/components/WithdrawModal';
import TextButton from '@/shared/components/button/TextButton';
import { useEffect, useState } from 'react';
import useFetchProfile from '../api/fetchProfile';
import { useQuery } from '@tanstack/react-query';

function MySetting() {
  const { fetchProfile } = useFetchProfile();
  const { data: profile } = useQuery({ queryKey: ['myProfile'], queryFn: fetchProfile });
  const [isOpen, setIsOpen] = useState(false);
  const [isQuit, setIsQuit] = useState(false);
  const [nickname, setNickName] = useState(profile?.nickname);
  const [editNickName, setEditNickName] = useState('');

  const handleEditNickName = async () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (profile) setNickName(profile?.nickname);
  }, [profile]);

  return (
    <section className="flex flex-col h-80 md:h-100 lg:h-125 justify-between">
      {isOpen && (
        <EditNickName
          nickname={nickname ?? ''}
          setIsOpen={setIsOpen}
          editNickName={editNickName}
          setEditNickName={setEditNickName}
          open={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          setNickName={setNickName}
        />
      )}
      {isQuit && <WithdrawModal open={isQuit} onClose={() => setIsQuit(!isQuit)} />}
      <div>
        <div className="flex justify-between py-5 border-b-1 border-gray-light">
          <div className="text-lg">닉네임 : {nickname}</div>
          <TextButton onClick={handleEditNickName}>수정하기</TextButton>
        </div>
        <div className="flex justify-between py-5">
          <h2>알람설정</h2>

          <ToggleBtn />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <TextButton onClick={() => setIsQuit(!isQuit)}>회원탈퇴</TextButton>
      </div>
    </section>
  );
}
export default MySetting;
