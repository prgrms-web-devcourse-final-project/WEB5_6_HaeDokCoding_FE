import StarBg from '@/domains/shared/starBg/StarBg';

function Page() {
  return (
    <div className="w-full relative">
      <div className="page-layout max-w-824">
        <StarBg className="w-full h-32 absolute"></StarBg>
      </div>
    </div>
  );
}

export default Page;
