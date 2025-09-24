'use client'
import CocktailCard from "../cocktailCard/CocktailCard";

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
    <ul>
      {/* {
        data.map(({ cocktailImgUrl, cocktailId, cocktailName }) => (
          <li key={cocktailId}>
            <CocktailCard src={cocktailImgUrl} name={cocktailName} nameKo={cocktailName} />
          </li>
        ))
      } */}
      <li>
        <CocktailCard />
      </li>
    </ul>
  );
}
export default Cocktails