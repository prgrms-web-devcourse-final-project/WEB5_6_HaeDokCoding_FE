import Share from '@/domains/shared/share/Share';
import BackBtn from '../components/details/BackBtn';
import Keep from '@/domains/shared/keep/Keep';

function DetailsHeader() {
  return (
    <div className="mt-4 flex items-center justify-between ">
      <BackBtn />
      <div className="flex items-center gap-3">
        <Share size="sm" />
        <Keep />
      </div>
    </div>
  );
}
export default DetailsHeader;
