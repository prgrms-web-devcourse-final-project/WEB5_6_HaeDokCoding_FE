import { useIsMobile } from './HomeModel';

function HomeText() {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <p className="absolute top-32 text-sm left-1/2 -translate-x-1/2 whitespace-nowrap">
          어떤 칵테일이 끌리시나요? SSoul이 쉽게 골라드릴게요.
        </p>
      ) : (
        <p className="absolute bottom-30 right-12 font-serif text-xl text-right font-normal">
          어떤 칵테일이 끌리시나요? SSoul이 쉽게 골라드릴게요.
        </p>
      )}
    </>
  );
}

export default HomeText;
