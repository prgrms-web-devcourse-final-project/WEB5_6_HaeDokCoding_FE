import Share from '@/shared/components/share/Share';
import Keep from '@/shared/components/keep/Keep';
import BackBtn from '../components/BackBtn';

function DetailsHeader() {
  return (
    <div className="mt-4 flex items-center justify-between ">
      <BackBtn />
      <div className="flex items-center gap-3">
        <Share />
        <Keep />
      </div>
    </div>
  );
}
export default DetailsHeader;
