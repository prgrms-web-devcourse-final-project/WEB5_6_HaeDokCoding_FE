'use client';
import CocktailCard from '../cocktailCard/CocktailCard';

function Cocktails() {
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
    <ul className="grid gap-8 justify-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
      {/* {
        data.map(({ cocktailImgUrl, cocktailId, cocktailName }) => (
          <li key={cocktailId}>
            <CocktailCard src={cocktailImgUrl} name={cocktailName} nameKo={cocktailName} />
          </li>
        ))
      } */}

      <CocktailCard />
      <CocktailCard />
      <CocktailCard />
      <CocktailCard />
      <CocktailCard />
      <CocktailCard />
    </ul>
  );
}
export default Cocktails;
