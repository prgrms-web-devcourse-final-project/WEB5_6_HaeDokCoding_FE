'use client';
import { getApi } from '@/app/api/config/appConfig';
import PostCard from '@/domains/community/main/PostCard';
import { useEffect, useState } from 'react';

function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPost = async () => {
    const res = await fetch(`${getApi}/me/posts`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    setMyPost(json.data.items);
  };

  useEffect(() => {
    console.log(myPost);
    fetchPost();
  }, []);

  return <PostCard posts={myPost} isLoading={isLoading} />;
}
export default MyPost;
