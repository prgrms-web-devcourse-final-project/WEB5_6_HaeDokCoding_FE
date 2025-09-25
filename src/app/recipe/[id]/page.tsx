import StarBg from '@/shared/components/starBg/StarBg';
import DetailMain from '../domains/details/DetailMain';

function page() {
  return (
    <div className="w-full relative">
      <StarBg className="absolute top-0 left-0 h-200 lg:h-200" />
      <DetailMain />
    </div>
  );
}
export default page;
