'use client';

import tw from '@/shared/utills/tw';
import { useState } from 'react';

const tabItem = [
  { title: '전체' },
  { title: '레시피' },
  { title: '팁' },
  { title: '질문' },
  { title: '자유' },
];

function CommunityTab() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section className="relative sm:w-[70%] w-full" aria-label="커뮤니티 탭">
      <div className="w-full overflow-x-scroll no-scrollbar scroll-smooth">
        <div className="flex gap-3 w-max" aria-label="커뮤니티 카테고리">
          {tabItem.map(({ title }, idx) => (
            <button
              key={title + idx}
              role="tab"
              aria-selected={selectedIdx === idx}
              tabIndex={selectedIdx === idx ? 0 : -1}
              onClick={() => setSelectedIdx(idx)}
              className={tw(
                `border-1 py-1 px-3 rounded-2xl transition-colors ease-in`,
                selectedIdx === idx ? 'bg-secondary text-primary' : 'hover:bg-secondary/20'
              )}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommunityTab;
