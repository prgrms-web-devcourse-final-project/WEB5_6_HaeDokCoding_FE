import SkeletonAlarm from '@/domains/recipe/skeleton/SkeletonAlarm';

function loading() {
  return (
    <div className="flex flex-col gap-3">
      <SkeletonAlarm></SkeletonAlarm>
      <SkeletonAlarm></SkeletonAlarm>
      <SkeletonAlarm></SkeletonAlarm>
      <SkeletonAlarm></SkeletonAlarm>
      <SkeletonAlarm></SkeletonAlarm>
    </div>
  );
}
export default loading;

// function SkeletonAlarmList({ count = 5 }: { count?: number }) {
//   return (
//     <div className="flex flex-col gap-3">
//       {Array.from({ length: count }).map((_, i) => (
//         <SkeletonAlarm key={i} />
//       ))}
//     </div>
//   );
// }
