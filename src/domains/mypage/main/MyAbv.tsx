import Help from '@/shared/assets/icons/help_24.svg';

function MyAbv() {
  return (
    <dl className="flex justify-between items-center text-gray-dark gap-2">
      <dt className='flex gap-1 items-center'>
        <p className="text-base md:text-lg text-bold">나의 알콜 도수</p>
        <Help />
      </dt>
      <dd className="text-base">
        <span className="text-2xl md:text-4xl font-bold">83</span>%
      </dd>
    </dl>
  );
}
export default MyAbv;
