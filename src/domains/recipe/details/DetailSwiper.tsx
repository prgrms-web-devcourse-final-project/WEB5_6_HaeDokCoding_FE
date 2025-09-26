import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import DetailRecommendList from './DetailRecommendList';

function DetailSwiper() {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      a11y={{
        enabled: true,
        prevSlideMessage: '이전 슬라이드',
        nextSlideMessage: '다음 슬라이드',
        firstSlideMessage: '첫 번째 슬라이드입니다',
        lastSlideMessage: '마지막 슬라이드입니다',
        paginationBulletMessage: '슬라이드 {{index}} 보기',
      }}
      aria-roledescription="carousel"
      keyboard={{ enabled: true, onlyInViewport: true }}
      modules={[Pagination, A11y, Keyboard]}
      className="mySwiper"
    >
      <SwiperSlide>
        <DetailRecommendList />
      </SwiperSlide>
      <SwiperSlide>
        <DetailRecommendList />
      </SwiperSlide>
      <SwiperSlide>
        <DetailRecommendList />
      </SwiperSlide>
      <SwiperSlide>
        <DetailRecommendList />
      </SwiperSlide>
    </Swiper>
  );
}
export default DetailSwiper;
