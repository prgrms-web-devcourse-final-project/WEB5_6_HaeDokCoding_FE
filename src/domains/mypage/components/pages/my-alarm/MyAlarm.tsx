'use client';
import { useEffect, useState } from 'react';
import Alarm from '../../Alarm';
import { getApi } from '@/app/api/config/appConfig';
import TextButton from '@/shared/components/button/TextButton';

interface MyAlarm {
  id: number,
  postId: number,
  postTitle: string,
  read: boolean,
  type: string,
  createdAt:Date
}

function MyAlarm() {
  const [myAlarm, setMyAlarm] = useState<MyAlarm[]>([]);

  const fetchAlarm = async () => {
    const res = await fetch(`${getApi}/me/notifications`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    console.log(json)
    setMyAlarm(json.data.items);
  };

  useEffect(() => {
    fetchAlarm();
  }, []);

  return (
    <section>
      <div className="flex justify-end">
        <TextButton className="my-5">전체삭제</TextButton>
      </div>
      {myAlarm.length !== 0 ? (
        myAlarm.map(({ id,postTitle,type}) => (
          <Alarm key={id} title={postTitle} content={type} />
        ))
      ) : (
        <div className="flex justify-center">
          <p>알림이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
export default MyAlarm;
