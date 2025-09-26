import StarBg from '@/domains/shared/starBg/StarBg';

function Page() {
  return (
    <div className="w-full relative">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <div className="page-layout max-w-824"></div>
    </div>
  );
}

export default Page;
