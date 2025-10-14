import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

function ImageSlide({ imageUrls }: { imageUrls: string[] }) {
  return (
    <Swiper
      spaceBetween={20}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true, type: 'bullets' }}
      loop
      className="w-full max-h-100 flex justify-center items-center"
    >
      {imageUrls.length > 0 &&
        imageUrls.map((img) => (
          <SwiperSlide className="w-full flex justify-center items-center" key={img}>
            <Image
              src={img}
              alt="이미지"
              width={150}
              height={150}
              className="object-contain w-full max-h-[400px]"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default ImageSlide;
