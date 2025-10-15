function HomeText({ isDesktop }: { isDesktop: boolean }) {
  return (
    <>
      {!isDesktop ? (
        <p className="absolute top-32 text-sm left-1/2 -translate-x-1/2 whitespace-nowrap">
          어떤 칵테일이 끌리시나요? SSoul이 쉽게 골라드릴게요.
        </p>
      ) : (
        <p className="absolute bottom-45 right-12 font-serif text-xl text-right font-normal z-20">
          어떤 칵테일이 끌리시나요? SSoul이 쉽게 골라드릴게요.
        </p>
      )}
    </>
  );
}

export default HomeText;
