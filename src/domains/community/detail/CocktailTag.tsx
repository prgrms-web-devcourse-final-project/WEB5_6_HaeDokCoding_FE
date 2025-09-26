import Tag from '@/shared/assets/icons/tag_30.svg';

function CocktailTag() {
  return (
    <div
      role="list"
      className="flex sm:gap-5 gap-2 sm:flex-row flex-col justify-center sm:items-center items-start sm:mb-0 mb-2 transition-all ease-in"
    >
      <p className="flex gap-1 items-center justify-center text-sm text-secondary">
        <Tag />
        칵테일태그
      </p>
      <ul className="flex text-sm gap-2 items-center text-primary font-light">
        <li className="bg-[#FFE4E6] px-2 py-[1px] rounded-md">올드패션</li>
        <li className="bg-[#EDE9FE] px-2 py-[1px] rounded-md">미도리 샤워</li>
      </ul>
    </div>
  );
}

export default CocktailTag;
