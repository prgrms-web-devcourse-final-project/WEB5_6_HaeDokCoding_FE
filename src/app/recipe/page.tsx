import Image from 'next/image'
import Star from '@/shared/assets/images/star_2.webp'
function Page() {
  return (
    <div className="page-layout max-w-1224">
      <Image src={Star}></Image>
    </div>
  )
}
export default Page;
