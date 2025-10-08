'use client';
import { getApi } from '@/app/api/config/appConfig';
import PostCard from '@/domains/community/main/PostCard';
import { useEffect, useState } from 'react';

interface MyLike {
  postId: number;
  title: string;
  likedAt: Date;
  posetCreatedAt: Date;
}

function MyLike() {
  const [myLike, setMyLike] = useState<MyLike[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLike = async () => {
    const res = await fetch(`${getApi}/me/likes/posts`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    // setMyLike(json.data.items);
  };

  useEffect(() => {
    fetchLike();
  }, []);

  // return <PostCard posts={myLike} isLoading={isLoading} />;
}
export default MyLike;
