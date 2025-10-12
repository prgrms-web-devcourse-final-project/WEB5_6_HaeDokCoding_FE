'use client';

import tw from '@/shared/utills/tw';
import { Post } from '../types/post';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  setPosts: (value: Post[] | null) => void;
  setIsLoading: (value: boolean) => void;
  setIsEnd: (value: boolean) => void;
};

export const tabItem = [
  { key: 'all', label: '전체' },
  { key: 'recipe', label: '레시피' },
  { key: 'tip', label: '팁' },
  { key: 'question', label: '질문' },
  { key: 'chat', label: '자유' },
];

function CommunityTab({ setPosts, setIsLoading, setIsEnd }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSort = searchParams.get('postSortStatus') || 'LATEST';

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const param = searchParams.get('category') || 'all';
    const exists = tabItem.some(({ key }) => key === param);
    return exists ? param : 'all';
  });

  return (
    <section className="relative sm:w-[70%] w-full" aria-label="커뮤니티 탭">
      <div className="w-full overflow-x-scroll no-scrollbar scroll-smooth">
        <div className="flex gap-3 w-max" aria-label="커뮤니티 카테고리">
          {tabItem.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={selectedCategory === key}
              tabIndex={selectedCategory === key ? 0 : -1}
              onClick={() => {
                setSelectedCategory(key);
                const params = new URLSearchParams();
                params.set('category', key);
                params.set('postSortStatus', currentSort); // ✅ 현재 필터 상태 유지
                router.push(`?${params.toString()}`);
              }}
              className={tw(
                `border-1 py-1 px-3 rounded-2xl transition-colors ease-in min-w-18`,
                selectedCategory === key ? 'bg-secondary text-primary' : 'hover:bg-secondary/20'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommunityTab;
