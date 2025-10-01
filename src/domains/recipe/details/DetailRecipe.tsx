interface Props {
  ingredient: string;
  recipe: string;
}

function DetailRecipe({ ingredient, recipe }: Props) {
  return (
    <div className="flex flex-col md:flex-row  px-5 gap-5">
      <article className="flex flex-col gap-4 w-[50%]">
        <h4 className="text-2xl font-bold">재료</h4>
        <ul className="flex flex-col gap-2">
          {ingredient}
          {/* <li className="text-lg">
            럼 <span className="text-sm text-white/80">1 1/2oz | 90ml</span>
          </li>
          <li className="text-lg">
            심플시럽 <span className="text-sm text-white/80">1/2oz | 30ml</span>
          </li>
          <li className="text-lg">
            라임 <span className="text-sm text-white/80">1/2개</span>
          </li>
          <li className="text-lg">
            자몽 <span className="text-sm text-white/80">1/2개</span>
          </li> */}
        </ul>
      </article>

      <span className="border-t-1 pt-5 md:border-l-1 md:border-t-0 md:px-10 border-white">
        <article className="flex flex-col gap-4 ">
          <h4 className="text-2xl font-bold">만드는 법</h4>
          <ol className="flex flex-col gap-2 pl-4 list-decimal">
            {recipe}
            {/* <li>셰이커에 라임즙을 착즙기로 짜 넣습니다</li>
            <li>셰이커에 자몽즙을 착즙기로 짜 넣습니다</li>
            <li>셰이커에 재료를 넣습니다</li>
            <li>셰이킹 후 잔에 따라줍니다</li> */}
          </ol>
        </article>
      </span>
    </div>
  );
}
export default DetailRecipe;
