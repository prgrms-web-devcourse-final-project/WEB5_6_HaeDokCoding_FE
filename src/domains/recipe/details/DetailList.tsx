import DetailRecommendList from "./DetailRecommendList";

function DetailList() {
  return (
    <ul className='flex justify-between gap-2'>
      <li>
        <DetailRecommendList />
      </li>
      <li>
        <DetailRecommendList />
      </li>
      <li>
        <DetailRecommendList />
      </li>
    </ul>
  );
}
export default DetailList;
