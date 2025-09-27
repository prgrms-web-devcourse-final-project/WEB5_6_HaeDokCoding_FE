'use client';
import TabMenu from '@/domains/mypage/main/TabMenu';
import TextButton from '@/shared/components/button/TextButton';
import { useState } from 'react';

const options = [
  {
    id: 1,
    title: '나만의 BAR',
  },
  {
    id: 2,
    title: '내 활동',
  },
  {
    id: 3,
    title: '알림',
  },
  {
    id: 4,
    title: '설정',
  },
];

const ActiveTab = [
  {
    id: 10,
    title: '내가 쓴 글',
  },
  {
    id: 11,
    title: '내가 쓴 댓글',
  },
  {
    id: 12,
    title: '좋아요 한 글',
  },
];

function MyNav() {
  const [isClick, setIsClick] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <ul className="mt-3 md:mt-10 flex justify-center gap-3">
        {options.map(({ id, title }, i) => (
          <li key={id}>
            <TabMenu index={i} title={title} isClick={isClick} setIsClick={setIsClick} />
          </li>
        ))}
      </ul>
      {(isClick == 0 || isClick == 2) && <TextButton className="self-end">전체삭제</TextButton>}
      {isClick == 1 && (
        <ul className="flex gap-5 w-full justify-center">
          {ActiveTab.map(({ id, title }, i) => (
            <li key={id} className="list-none flex">
              <TabMenu
                title={title}
                type="underLine"
                isClick={activeTab}
                setIsClick={setActiveTab}
                index={i}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default MyNav;
