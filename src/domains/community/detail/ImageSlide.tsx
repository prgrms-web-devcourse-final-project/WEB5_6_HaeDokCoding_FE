import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

function ImageSlide() {
  return (
    <Swiper
      spaceBetween={20}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true, type: 'bullets' }}
      loop
      className="w-full max-h-100 flex justify-center items-center"
    >
      {
        <>
          <SwiperSlide className="w-full flex justify-center items-center">
            <Image
              src={prePost}
              alt="더미 이미지"
              className="object-contain w-full max-h-[400px]"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full flex justify-center items-center">
            <Image
              src={prePost}
              alt="더미 이미지"
              className="object-contain w-full max-h-[400px]"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full flex justify-center items-center">
            <Image
              src={prePost}
              alt="더미 이미지"
              className="object-contain w-full max-h-[400px]"
            />
          </SwiperSlide>
        </>
      }
    </Swiper>
  );
}

export default ImageSlide;
