'use client';
import { useEffect, useState } from 'react';
import Alarm from '../../Alarm';
import { getApi } from '@/app/api/config/appConfig';
import TextButton from '@/shared/components/button/TextButton';

interface MyAlarm {
  notificationId: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
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

  return (
    <section>
      <div className="flex justify-end">
        <TextButton className="my-5">전체삭제</TextButton>
      </div>
      {myAlarm.length !== 0 ? (
        myAlarm.map(({ notificationId, title, content }) => (
          <Alarm key={notificationId} title={title} content={content} />
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
