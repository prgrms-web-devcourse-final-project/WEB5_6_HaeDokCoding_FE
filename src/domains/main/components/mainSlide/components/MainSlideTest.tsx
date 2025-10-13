import MainTestDummy from './MainTestDummy';

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
    <div className="slide-content w-3/4 p-12 h-full bg-[#645a72] rounded-tl-[30px] rounded-bl-[30px] flex flex-col justify-center ">
      <div className="flex flex-col gap-15">
        <span className="text-[32px] font-black text-secondary">1</span>
        <div className="flex flex-col gap-15">
          <div className="flex flex-col gap-5">
            <h2 className=" text-5xl font-black text-secondary text-shadow  text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
              AI기반 취향테스트
            </h2>
            <p className="text-2xl leading-[1.5] font-normal text-secondary">
              복잡한 이름과 긴 설명 때문에 내 취향 칵테일 찾기 어려우셨나요? <br />
              AI쑤리가 당신에게 딱 맞는 칵테일을 추천해 드려요!
            </p>
          </div>
          <ul className="flex gap-8">
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
            <MainTestDummy type="text" />
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MainSlideTest;
