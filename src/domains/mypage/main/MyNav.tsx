'use client';
import TabMenu from '@/domains/mypage/main/TabMenu';
import TextButton from '@/shared/components/button/TextButton';
import Link from 'next/link';

import { useState } from 'react';
import DeleteAllModal from '../components/DeleteAllModal';

const options = [
  {
    title: '나만의 BAR',
    href: '/mypage/mybar',
  },
  {
    title: '내 활동',
    href: '/mypage/my-active',
  },
  {
    title: '알림',
    href: '/mypage/my-alarm',
  },
  {
    title: '설정',
    href: '/mypage/my-setting',
  },
];

const ActiveTab = [
  {
    title: '내가 쓴 글',
    href: '/mypage/my-active/my-post',
  },
  {
    title: '내가 쓴 댓글',
    href: '/mypage/my-active/my-comment',
  },
  {
    title: '좋아요 한 글',
    href: '/mypage/my-active/my-like',
  },
];

function MyNav() {
  const [isClick, setIsClick] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  return (
    <section aria-labelledby="mypage-tabs" className=" mt-6 md:mt-1 flex flex-col gap-3">
      {isDeleteAll && (
        <DeleteAllModal open={isDeleteAll} onClose={() => setIsDeleteAll(!isDeleteAll)} />
      )}
      <h2 id="mypage-tabs" className="sr-only">
        마이페이지 탭 메뉴
      </h2>

      <nav aria-label="마이페이지 섹션">
        <ul role="tablist" className="mt-3 md:mt-10 flex justify-center gap-3">
          {options.map(({ title, href }, i) => {
            const selected = i === isClick;
            const tabId = `main-tab-${i}`;
            const panelId = `main-panel-${i}`;
            return (
              <li key={href} role="presentation">
                <Link href={href}>
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
                </Link>
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

      {(isClick == 0 || isClick == 2) && (
        <TextButton className="self-end" onClick={() => setIsDeleteAll(!isDeleteAll)}>
          전체삭제
        </TextButton>
      )}

      {isClick == 1 && (
        <nav aria-label="내 활동 하위 탭">
          <ul role="tablist" className="flex gap-5 w-full justify-center">
            {ActiveTab.map(({ href, title }, i) => {
              const selected = i === activeTab;
              const tabId = `sub-tab-${i}`;
              const panelId = `sub-panel-${i}`;
              return (
                <li key={href} role="presentation" className="list-none flex">
                  <Link href={href}>
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
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      {isClick === 1 &&
        ActiveTab.map((_, i) => (
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
