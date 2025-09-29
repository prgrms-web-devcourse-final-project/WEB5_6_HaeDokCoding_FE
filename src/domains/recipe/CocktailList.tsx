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
      className=" place-content-between
    grid gap-8
    grid-cols-1 sm:justify-items-stretch
    sm:[grid-template-columns:repeat(2,minmax(0,320px))]  sm:gap-8    md:[grid-template-columns:repeat(3,minmax(0,250px))]  
     lg:[grid-template-columns:repeat(4,minmax(0,250px))]
    
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
