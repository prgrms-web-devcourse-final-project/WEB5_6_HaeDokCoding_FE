import Landing from '@/domains/shared/components/3d/Landing';

import MainSlide from '@/domains/main/components/mainSlide/components/MainSlide';

export default function Home() {
  return (
    <div className="page-layout max-w-full">
      <Landing />
      <MainSlide />
    </div>
  );
}
