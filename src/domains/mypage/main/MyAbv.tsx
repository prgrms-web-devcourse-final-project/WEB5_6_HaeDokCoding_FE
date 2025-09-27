import Help from '@/shared/assets/icons/help_24.svg';

function MyAbv() {
  return (
    <div className="flex items-center text-gray-dark gap-1">
      <p className="text-base md:text-lg text-bold">나의 알콜 도수</p>
      <Help />
      <p className="text-base">
        <span className="text-2xl md:text-4xl font-bold">83</span>%
      </p>
    </div>
  );
}
export default MyAbv;
