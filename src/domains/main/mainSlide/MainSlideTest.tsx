import MainTestDummy from "./components/MainTestDummy";

const DUMMY_TEST = [
  {
    id: 1,
    message: '질문형 취향 찾기',
    active:false
  },
  {
    id: 2,
    message:'단계별 취향 찾기',
    active:true
  }
]



function MainSlideTest() {
  return (
    <div className="slide-content w-3/4 py-20 pl-11 h-full bg-[#645a72] rounded-tl-[30px] rounded-bl-[30px] flex flex-col justify-between ">
      <span className="text-5xl font-black text-secondary">1</span>
      <div className="flex flex-col w-full gap-[14px] justify-center mb-60">
        <h2 className=" text-5xl font-black text-secondary text-shadow  text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
          AI기반 취향테스트
        </h2>
        <p className="text-2xl">
          AI쑤리가 도와주는 당신의 칵테일 취향테스트 <br />
          칵테일을 마시러 가면 어려운 이름,설명에 지쳐 내 취향 칵테일을 찾을 기회도 없지 않으셨나요?{' '}
          <br />
          AI쑤리(Ssury)가 당신이 궁금했던 칵테일에 대한 정보들을 해결해줄거예요!
        </p>
      </div>
      <div className="relative">
        <ul className=" absolute bottom-5 left-17 flex gap-6 items-end ">
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

          <MainTestDummy
            message={
              <>
                짠🎉🎉 <br />
                칵테일의 자세한 정보는 &apos;상세보기&apos;를 클릭해서 확인할 수 있어요. <br />
                마음에 드는 칵테일은 &apos;킵&apos; 버튼을 눌러 나만의 Bar에 저장해보세요!
              </>
            }
   
            type="text"
          />
        </ul>
        <div className="bg-white/80 rounded-tl-3xl rounded-bl-3xl h-[42px] w-full flex justify-end"></div>
      </div>
    </div>
  );
}
export default MainSlideTest