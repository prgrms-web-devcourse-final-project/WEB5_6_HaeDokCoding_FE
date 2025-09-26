import Image from 'next/image'
import Example from '@/shared/assets/images/dummy/exampleCocktail.png'
function DetailRecommendList() {
  return (
    <div className="flex flex-col gap-3">
      <div className="max-h-75">
        <Image src={Example} alt="" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className='font-serif font-bold text-xl lg:text-2xl'>Old Fashioned</h4>
        <p className='font-serif font-bold text-sm lg:text-base'>올드패션드</p>
      </div>
    </div>
  );
}
export default DetailRecommendList