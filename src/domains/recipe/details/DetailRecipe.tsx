interface Props {
  ingredient: string;
  recipe: string;
}

function DetailRecipe({ ingredient, recipe }: Props) {
  const ingredients = ingredient.trim().split(',').filter(Boolean);
  console.log(ingredient)
  const recipes = recipe.trim().split('.').filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row  px-5 gap-5">
      <article className="flex flex-col gap-4 w-[50%]">
        <h4 className="text-2xl font-bold">재료</h4>
        <ul className="flex flex-col gap-2">
          {ingredients.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </article>

      <span className="border-t-1 w-full md:w-1/2 pt-5 md:border-l-1 md:border-t-0 md:px-10 border-white">
        <article className="flex flex-col gap-4 ">
          <h4 className="text-2xl font-bold">만드는 법</h4>
          <ol className="flex flex-col gap-2 pl-4 list-decimal">
            {recipes.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ol>
        </article>
      </span>
    </div>
  );
}
export default DetailRecipe;
