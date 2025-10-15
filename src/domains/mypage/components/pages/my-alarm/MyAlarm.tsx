'use client';
import { useState } from 'react';
import Alarm from '../../Alarm';
import { getApi } from '@/app/api/config/appConfig';
import TextButton from '@/shared/components/button/TextButton';
import Link from 'next/link';
import useFetchAlarm from '@/domains/mypage/api/fetchAlarm';
import { useQuery } from '@tanstack/react-query';
import DeleteAllModal from '../../DeleteAllModal';
import { useToast } from '@/shared/hook/useToast';

interface MyAlarm {
  createdAt: Date;
  id: number;
  message: string;
  postCategoryName: string;
  postId: number;
  postThumbnailUrl: string | null;
  postTitle: string;
  read: boolean;
  type: string;
}

function MyAlarm() {
  const { toastInfo } = useToast();
  const [isModal, setIsModal] = useState(false);
  const { fetchAlarm } = useFetchAlarm();
  const { data } = useQuery({
    queryKey: ['alarm'],
    queryFn: fetchAlarm,
  });

  const handleDelete = () => {
    if (data.items.length == 0) {
      toastInfo('아직 알림이 없습니다.');
      return;
    }
    setIsModal(!isModal);
  };

  const handleRead = async (id: number) => {
    await fetch(`${getApi}/me/notifications/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
  };
  const items = data?.items ?? [];

  return (
    <section>
      <div className="flex justify-end">
        {isModal && (
          <DeleteAllModal
            open={isModal}
            onClose={() => setIsModal(!isModal)}
            setIsModal={setIsModal}
            type="myAlarm"
          />
        )}
        <TextButton className="my-5" onClick={handleDelete}>
          전체삭제
        </TextButton>
      </div>
      <div className="flex flex-col gap-3">
        {items.length !== 0 ? (
          items.map(({ id, postId, postTitle, read, message, createdAt }: MyAlarm) => (
            <Link href={`/community/${postId}`} key={id} onClick={() => handleRead(id)}>
              <Alarm title={postTitle} content={message} createdAt={createdAt} read={read} />
            </Link>
          ))
        ) : (
          <div className="flex justify-center">
            <p>알림이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
export default MyAlarm;
