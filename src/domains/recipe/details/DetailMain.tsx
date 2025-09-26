'use client';

import DetailItem from './DetailItem';
import DetailRecipe from './DetailRecipe';
import DetailsHeader from './DetailsHeader';
import SsuryShake from '@/shared/assets/ssury/ssury_make.webp';
import SsuryDrink from '@/shared/assets/ssury/ssury_drink.webp';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';

import DetailRecommendList from './DetailRecommendList';

function DetailMain() {
  return (
    <div className="max-w-1024 page-layout">
      <DetailsHeader />

      <article className="flex flex-col items-center mt-4 lg:mt-0">
        <span className="md:bg-secondary w-1 h-100 -translate-y-19 absolute top-0 left-1/2 -translate-x-1/2 md: z-2"></span>
        <span className="h-3 w-3 rounded-full absolute  top-80 left-1/2 -translate-x-1/2 z-99 md:bg-secondary"></span>
        <DetailItem />
      </article>

      <section className="mt-20 flex flex-col gap-5">
        <div className="border-b-1 h-18 border-white">
          <div className="flex items-center gap-3">
            <Image src={SsuryShake} alt="" width="48" height="48" />
            <h3 className="text-3xl font-bold">레시피</h3>
          </div>
        </div>
        <DetailRecipe />
      </section>

      <section className="mt-20" aria-labelledby="옆으로 슬라이드되는 리스트">
        <h2 className="sr-only">추천 칵테일 리스트</h2>
        <div className="border-b-1 h-18 border-white">
          <div className="flex items-center gap-3">
            <Image src={SsuryDrink} alt="" width="48" height="48" />
            <h3 className="text-3xl font-bold">추천리스트</h3>
          </div>
        </div>

        <div className="mt-5">
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
        </div>
      </section>

      <section>{/* 여기에 댓글 컴포넌트 */}</section>
    </div>
  );
}
export default DetailMain;
