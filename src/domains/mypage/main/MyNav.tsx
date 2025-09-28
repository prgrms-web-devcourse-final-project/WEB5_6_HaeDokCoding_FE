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
    <section aria-labelledby="mypage-tabs" className=" mt-6 md:mt-1 flex flex-col gap-3">
      <h2 id="mypage-tabs" className="sr-only">
        마이페이지 탭 메뉴
      </h2>

      <nav aria-label="마이페이지 섹션">
        <ul role="tablist" className="mt-3 md:mt-10 flex justify-center gap-5">
          {options.map(({ id, title }, i) => {
            const selected = i === isClick;
            const tabId = `main-tab-${i}`;
            const panelId = `main-panel-${i}`;
            return (
              <li key={id} role="presentation">
                <TabMenu
                  id={tabId}
                  role="tab"
                  index={i}
                  title={title}
                  isClick={isClick}
                  setIsClick={setIsClick}
                  aria-selected={selected ? 'true' : 'false'}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                />
              </li>
            );
          })}
        </ul>
      </nav>
      {options.map((_, i) => (
        <div
          key={`main-panel-${i}`}
          id={`main-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`main-tab-${i}`}
          hidden={isClick !== i}
        >
          {/* 필요하면 여기 메인 탭별 콘텐츠 렌더 */}
        </div>
      ))}

      {(isClick == 0 || isClick == 2) && <TextButton className="self-end">전체삭제</TextButton>}

      {isClick == 1 && (
        <nav aria-label="내 활동 하위 탭">
          <ul role="tablist" className="flex gap-5 w-full justify-center">
            {ActiveTab.map(({ id, title }, i) => {
              const selected = i === activeTab;
              const tabId = `sub-tab-${i}`;
              const panelId = `sub-panel-${i}`;
              return (
                <li key={id} role="presentation" className="list-none flex">
                  <TabMenu
                    id={tabId}
                    tabIndex={selected ? 0 : -1}
                    aria-selected={selected ? 'true' : 'false'}
                    aria-controls={panelId}
                    role="tab"
                    title={title}
                    type="underLine"
                    isClick={activeTab}
                    setIsClick={setActiveTab}
                    index={i}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      {isClick === 1 && ActiveTab.map((_, i) => (
        <div
          key={`sub-panel-${i}`}
          id={`sub-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`sub-tab-${i}`}
          hidden={activeTab !== i}
        >
          {/* 필요하면 여기 서브 탭별 콘텐츠 렌더 */}
        </div>
      ))}
    </section>
  );
}
export default MyNav;
