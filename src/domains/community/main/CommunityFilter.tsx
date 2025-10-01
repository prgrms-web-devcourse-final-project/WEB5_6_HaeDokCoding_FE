'use client';

import { getApi } from '@/app/api/config/appConfig';
import { Post } from '../types/post';
import SelectBox from '@/shared/components/select-box/SelectBox';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  posts: Post[] | null;
  setPosts: Dispatch<SetStateAction<Post[] | null>>;
};

function CommunityFilter({ posts, setPosts }: Props) {
  const handleChange = (selectTitle: string) => {
    console.log(selectTitle);

    const fetchData = async () => {
      if (selectTitle === '최신순') {
        try {
          const res = await fetch(`${getApi}/posts?postSortStatus=LATEST`, {
            method: 'GET',
          });
          const data = await res.json();
          setPosts(data.data);
        } catch (err) {
          console.error('에러', err);
          return null;
        }
      } else if (selectTitle === '인기순') {
        try {
          const res = await fetch(
            `${getApi}/posts?postSortStatus=POPULAR&lastId={lastId}&lastLikeCount={lastLikeCount}`,
            {
              method: 'GET',
              mode: 'no-cors',
            }
          );
          const data = await res.json();
          setPosts(data.data);
        } catch (err) {
          console.error('에러', err);
          return null;
        }
      } else if (selectTitle === '댓글순') {
        try {
          const res = await fetch(
            `${getApi}/posts?postSortStatus=COMMENTS&lastId={lastId}&lastCommentCount={lastCommentCount}`,
            {
              method: 'GET',
              mode: 'no-cors',
            }
          );
          const data = await res.json();
          setPosts(data.data);
        } catch (err) {
          console.error('에러', err);
          return null;
        }
      }
    };
    fetchData();
  };

  return (
    <section
      className="w-full flex justify-between items-center border-b-1 border-gray-light pb-1.5"
      aria-label="커뮤니티 정렬 필터"
    >
      <p aria-live="polite">{posts && posts.length}개</p>
      <SelectBox
        option={['최신순', '인기순', '댓글순']}
        title={'최신순'}
        onChange={(value) => handleChange(value)}
      />
    </section>
  );
}

export default CommunityFilter;
