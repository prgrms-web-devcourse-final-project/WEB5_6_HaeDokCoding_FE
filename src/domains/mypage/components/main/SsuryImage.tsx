
import Image from 'next/image';
import useProfileSsury from '../../hook/useProfileSsury';

function SsuryImage({ abvLevel }: { abvLevel: number }) {
  const profileImage = useProfileSsury(abvLevel);

  return <Image src={profileImage} alt="" />;
}
export default SsuryImage;
