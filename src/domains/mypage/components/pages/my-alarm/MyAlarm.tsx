'use client';
import { useEffect, useState } from 'react';
import Alarm from '../../Alarm';
import { getApi } from '@/app/api/config/appConfig';
import TextButton from '@/shared/components/button/TextButton';
import Link from 'next/link';

interface MyAlarm {
  createdAt:Date
  id: number
  message: string
  postCategoryName: string
  postId: number
  postThumbnailUrl:string| null;
  postTitle: string
  read: boolean
  type: string
}

function MyAlarm() {
  const [myAlarm, setMyAlarm] = useState<MyAlarm[]>([]);

  const fetchAlarm = async () => {
    const res = await fetch(`${getApi}/me/notifications`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    setMyAlarm(json.data.items);
  };

  useEffect(() => {
    fetchAlarm();
  }, []);

  const handleRead = async (id:number) => {
    await fetch(`${getApi}/me/notifications/${id}`, {
      method: 'POST',
      credentials:'include'
    })
  }

  return (
    <section>
      <div className="flex justify-end">
        <TextButton className="my-5">전체삭제</TextButton>
      </div>
      <div className="flex flex-col gap-3">
        {myAlarm.length !== 0 ? (
          myAlarm.map(({ id, postId, postTitle,read, message, createdAt }) => (
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
