'use client';
import { getApi } from '@/app/api/config/appConfig';
import { useEffect, useState } from 'react';

interface Profile {
  abvDegree: number;
  abvLabel: string;
  abvLevel: number;
  email?: string;
  id: number;
  myCommentCount: number;
  myKeepCount: number;
  myLikedPostCount: number;
  myPostCount: number;
  nickname: string;
}

function useFetchProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    const res = await fetch(`${getApi}/me/profile`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    setProfile(json.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, fetchProfile };
}
export default useFetchProfile;
