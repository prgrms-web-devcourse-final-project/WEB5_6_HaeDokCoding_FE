import MainTestDummy from '../MainTestDummy';

const DUMMY_TEST = [
  {
    id: 1,
    message: '질문형 취향 찾기',
    active: false,
  },
  {
    id: 2,
    message: '단계별 취향 찾기',
    active: true,
  },
];

function MainSlideTest() {
  return (
    <article className="slide-content invisible w-[80%] p-12 h-full bg-[#4D4D4D] rounded-tl-[30px] rounded-bl-[30px] flex flex-col">
      <div className="flex flex-col gap-8 h-full">
        <p className="text-[32px] text-white font-bold">1</p>
        <div className="flex flex-col justify-between h-full">
          <header className="flex flex-col gap-8">
            <h2 className="text-5xl text-white font-bold">AI기반 취향테스트</h2>
            <p className="text-xl leading-[1.5] font-normal text-white">
              복잡한 이름과 긴 설명 때문에 내 취향 칵테일 찾기 어려우셨나요? <br />
              AI쑤리가 당신에게 딱 맞는 칵테일을 추천해 드려요!
            </p>
          </header>
          <ul className="flex gap-8">
            <li>
              <MainTestDummy
                message={
                  <>
                    안녕하세요! 🍹바텐더 쑤리에요.
                    <br />
                    취향에 맞는 칵테일을 추천해드릴게요. <br />
                    어떤 유형으로 찾아드릴까요?
                  </>
                }
                option={DUMMY_TEST}
                type="option"
              />
            </li>
            <li>
              <MainTestDummy type="text" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
export default MainSlideTest;
