'use client';
import CocktailCard from './CocktailCard';

function CocktailList() {
  // const [data,setData] = useState([])
  //   useEffect(() => {
  //     fetch('http://localhost:8080/api/cocktails')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data.data)
  //         setData(data.data)
  //       });
  //   }, []);

  return (
    <ul
      className="
    grid gap-8
    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    justify-items-center sm:justify-items-stretch
  "
    >
      {/* {
        data.map(({ cocktailImgUrl, cocktailId, cocktailName }) => (
          <li key={cocktailId}>
            <CocktailCard src={cocktailImgUrl} name={cocktailName} nameKo={cocktailName} />
          </li>
        ))
      } */}
      <li className="w-full min-w-0 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
        <CocktailCard />
      </li>
      <li className="w-full min-w-0 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
        <CocktailCard />
      </li>{' '}
      <li className="w-full min-w-0 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
        <CocktailCard />
      </li>{' '}
      <li className="w-full min-w-0 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
        <CocktailCard />
      </li>
    </ul>
  );
}
export default CocktailList;
