import Ssury from '@/shared/assets/ssury/ssury_shaker.webp';
import Image from 'next/image';
import Send from '@/shared/assets/icons/send_36.svg';
import Link from 'next/link';
import { setPreLoginPath } from '@/domains/shared/auth/utils/setPreLoginPath';
import Crop from '@/shared/assets/icons/crop_32.svg';

function ChatPreview() {
  return (
    <section className="relative flex-1 flex flex-col w-full">
      <div className="page-layout max-w-1024 py-12">
        <article aria-label="취향추천 챗봇 메시지" className="">
          <header className="flex items-end">
            <div className="relative w-15 md:w-20 h-15 md:h-20">
              <Image
                src={Ssury}
                alt="쑤리아바타"
                width={80}
                height={80}
                className="object-cover w-15 h-15 md:w-20 md:h-20"
              />
            </div>
            <p>쑤리</p>
          </header>

          {/* 메시지 그룹 */}
          <div className="flex flex-col gap-3 mt-3 pl-3">
            <div>
              <div className="flex flex-col w-fit max-w-[80%] min-w-[120px] p-3 rounded-2xl rounded-tl-none bg-white text-black opacity-0 animate-fadeIn">
                <div>
                  <p className="whitespace-pre-line">취향에 맞는 칵테일🤩 저와 함께 찾아볼까요?</p>
                  <Link
                    href="/login"
                    onNavigate={async () => {
                      await setPreLoginPath(window.location.pathname);
                    }}
                    className="block p-2 mt-3 flex-center font-semibold bg-gray-light rounded-3xl hover:bg-secondary hover:shadow-[inset_0_0_6px_rgba(255,196,1,1)] active:bg-secondary active:shadow-[inset_0_0_6px_rgba(255,196,1,1)]"
                  >
                    간편 로그인으로 빠르게 이용하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="fixed left-0 bottom-0 w-full px-3 py-4 flex-center bg-primary">
          <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-[64rem]">
            <div className="flex items-center gap-2">
              <button
                aria-label="채팅 이미지 저장"
                title="채팅내용 이미지 저장"
                className="flex-center rounded-full sm:bg-secondary/20 sm:w-10 sm:h-10 hover:bg-white/10 active:bg-white/10"
              >
                <Crop />
              </button>
              <label htmlFor="chatInput" className="sr-only">
                질문 입력창
              </label>
              <textarea
                id="chatInput"
                name="chatInput"
                placeholder={'로그인 후 이용해주세요.'}
                disabled
                className={`
            w-[calc(100%-3rem)] md:w-[calc(100%-3.75rem)] px-4 py-2 md:py-3.5
            rounded-lg h-[40px] md:h-[52px] max-h-[160px] md:max-h-[280px]
            bg-white text-primary placeholder:text-gray-dark resize-none outline-none
            disabled:bg-gray disabled:text-gray-dark disabled:cursor-not-allowed
          `}
              />
              <button
                type="button"
                aria-label="보내기"
                className="flex-center w-10 md:w-13 h-10 md:h-13 rounded-xl border-1 border-white bg-secondary/20"
              >
                <Send className="text-secondary" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default ChatPreview;
