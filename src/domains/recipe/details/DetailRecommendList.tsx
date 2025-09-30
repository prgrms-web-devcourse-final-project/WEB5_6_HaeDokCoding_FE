import Image from 'next/image';

function DetailRecommendList() {
  return (
    <div className="flex flex-col gap-3">
      <div className="max-h-75">
        <Image src={''} alt="" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-serif  text-base lg:text-lg">Old Fashioned</h4>
        <p className="font-serif text-base">올드패션드</p>
      </div>
    </div>
  );
}
export default DetailRecommendList;
