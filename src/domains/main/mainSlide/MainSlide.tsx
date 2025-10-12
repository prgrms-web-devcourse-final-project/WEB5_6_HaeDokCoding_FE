import MainSlideAbv from "./MainSlideAbv";
import MainSlideCommunity from "./MainSlideCommunity";
import MainSlideIntro from "./MainSlideIntro";
import MainSlideTest from "./MainSlideTest";

function MainSlide() {
  return (
    <section className="w-full flex flex-col items-end">
      <MainSlideIntro/>
      <MainSlideTest/>
      <MainSlideCommunity/>
      <MainSlideAbv/>
    </section>
  );
}
export default MainSlide