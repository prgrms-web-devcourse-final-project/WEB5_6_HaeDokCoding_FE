import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState } from 'react';

function ImageSlide({ imageUrls }: { imageUrls: string[] }) {
  const shouldLoop = imageUrls.length > 1;
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (imgUrl: string) => {
    setLoadedImages((prev) => new Set(prev).add(imgUrl));
  };

  return (
    <Swiper
      spaceBetween={20}
      modules={[Navigation, Pagination]}
      navigation={shouldLoop}
      pagination={{ clickable: true, type: 'bullets' }}
      loop={shouldLoop}
      className="w-full max-h-100 flex justify-center items-center"
    >
      {imageUrls.length > 0 &&
        imageUrls.map((img) => (
          <SwiperSlide className="w-full flex justify-center items-center" key={img}>
            <div className="relative w-full h-[400px] flex items-center justify-center">
              {!loadedImages.has(img) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray/80 rounded-lg">
                  <div className="w-8 h-8 border-4 border-secondary border-t-tertiary rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={img}
                alt="이미지"
                width={800}
                height={600}
                quality={90}
                priority
                onLoad={() => handleImageLoad(img)}
                onError={() => handleImageLoad(img)}
                className={`object-contain w-full max-h-[400px] transition-opacity duration-300 ${
                  loadedImages.has(img) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default ImageSlide;
