import { useRouter } from 'next/navigation';

function PassBtn() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/recommend');
  };
  return (
    <button
      onClick={handleClick}
      className="w-[90%] md:w-120 py-5 md:px-20 px-5 md:text-2xl text-lg rounded-xl flex items-center justify-center bg-tertiary/70"
    >
      <span className="text-primary font-serif whitespace-nowrap">
        칵테일 취향추천 <span className="text-secondary font-serif">바로가기</span>
      </span>
    </button>
  );
}

export default PassBtn;
