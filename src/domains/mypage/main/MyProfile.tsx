'use client';

import AbvGraph from '@/domains/shared/components/abv-graph/AbvGraph';
import MyAbv from './MyAbv';
import SsuryImage from './SsuryImage';
import useFetchProfile from '../api/fetchProfile';
import { useQuery } from '@tanstack/react-query';

function MyProfile() {
  const { fetchProfile } = useFetchProfile();
  const { data } = useQuery({ queryKey: ['myProfile'], queryFn: fetchProfile });

  if (!data) return;
  const {
    nickname,
    abvLevel,
    myLikedPostCount,
    myPostCount,
    myCommentCount,
    myKeepCount,
    abvDegree,
  } = data;

  return (
    <section className="h-auto  p-6 bg-white rounded-2xl">
      <header className="flex flex-col gap-8 md:gap-3 md:flex-row md:justify-between ">
        {data && (
          <>
            <div className="flex flex-col pb-4 md:pb-0 md:flex-col gap-6">
              <div className="rounded-full w-17.5 h-17.5 flex items-center gap-2">
                <SsuryImage abvLevel={abvLevel} />
                <p className="text-gray-dark text-2xl whitespace-nowrap font-bold">{nickname}</p>
              </div>
              <ul className="flex gap-3 text-gray-dark text-xs">
                <li className="flex gap-1">
                  <p>좋아요 {myLikedPostCount}</p>
                </li>
                <span>|</span>
                <li className="flex gap-1">
                  <p>글 {myPostCount}</p>
                </li>
                <span>|</span>
                <li className="flex gap-1">
                  <p>댓글 {myCommentCount}</p>
                </li>
                <span>|</span>
                <li className="flex gap-1">
                  <p>칵테일 킵 {myKeepCount}</p>
                </li>
              </ul>
            </div>
            <aside className="flex flex-col gap-2 md:pt-3">
              <MyAbv abv={abvDegree} />
              <AbvGraph max={100} abv={abvDegree} type="myAbv" />
            </aside>
          </>
        )}
      </header>
    </section>
  );
}

export default MyProfile;
