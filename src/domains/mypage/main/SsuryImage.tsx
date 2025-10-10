import useProfileSsury from '../hook/useProfileSsury';
import Image from 'next/image';

function SsuryImage({ abvLevel }: { abvLevel: number }) {
  const profileImage = useProfileSsury(abvLevel);

  return <Image src={profileImage} alt="" />;
}
export default SsuryImage;
