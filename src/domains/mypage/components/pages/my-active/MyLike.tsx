'use client';
import { getApi } from '@/app/api/config/appConfig';
import PostCard from '@/domains/community/main/PostCard';
import { useEffect, useState } from 'react';

function MyLike() {
  const [myLike, setMyLike] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLike = async () => {
    const res = await fetch(`${getApi}/me/likes`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    setMyLike(json.data.items);
  };

  useEffect(() => {
    fetchLike();
  }, []);

  return (
    <PostCard posts={myLike} isLoading={isLoading} />
  );
}
export default MyLike;
