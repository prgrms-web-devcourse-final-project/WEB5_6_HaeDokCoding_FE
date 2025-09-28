function AbvGraph() {
  return (
    <div className="w-full md:w-49 h-3 rounded-full overflow-hidden border-[0.5px] border-gray relative" role='progressbar' aria-label="나의 알코올 도수">
      <div
        className="absolute top-0 left-0 w-10  h-3 
                  bg-linear-to-r from-[#FFCA8D] to-[#FA2424]
                  "
      ></div>
    </div>
  );
}
export default AbvGraph;
