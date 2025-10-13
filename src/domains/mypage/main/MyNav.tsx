'use client';
import TabMenu from '@/domains/mypage/main/TabMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MAIN_TABMENU = [
  {
    title: '나만의 BAR',
    href: '/mypage/my-bar',
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

const SUB_TABMENU = [
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
  const pathname = usePathname();

  const currentIndex = MAIN_TABMENU.findIndex((opt) => pathname.startsWith(opt.href));
  const isActive = currentIndex === -1 ? 0 : currentIndex;

  const subIndex = SUB_TABMENU.findIndex((opt) => pathname.startsWith(opt.href));
  const isSubActive = subIndex === -1 ? 0 : subIndex;



  return (
    <section aria-labelledby="mypage-tabs" className=" mt-6 md:mt-1 flex flex-col gap-3">
 
      <h2 id="mypage-tabs" className="sr-only">
        마이페이지 탭 메뉴
      </h2>

      <nav aria-label="마이페이지 섹션">
        <ul role="tablist" className="mt-3 md:mt-10 flex justify-center gap-3">
          {MAIN_TABMENU.map(({ title, href }, i) => {
            const selected = i === isActive;
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
                    isClick={isActive}
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
      {MAIN_TABMENU.map((_, i) => (
        <div
          key={`main-panel-${i}`}
          id={`main-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`main-tab-${i}`}
          hidden={isActive !== i}
        ></div>
      ))}

      {isActive == 1 && (
        <nav aria-label="내 활동 하위 탭">
          <ul role="tablist" className="flex gap-5 w-full justify-center">
            {SUB_TABMENU.map(({ href, title }, i) => {
              const selected = i === isSubActive;
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
                      isClick={isSubActive}
                      index={i}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      {isActive === 1 &&
        SUB_TABMENU.map((_, i) => (
          <div
            key={`sub-panel-${i}`}
            id={`sub-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`sub-tab-${i}`}
            hidden={isActive !== i}
          ></div>
        ))}
    </section>
  );
}
export default MyNav;
