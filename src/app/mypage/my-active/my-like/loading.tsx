import SkeletonPostCard from '@/domains/shared/skeleton/SkeletonPostCard';

function loading() {
  return (
    <ul>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}>
          <SkeletonPostCard />
        </li>
      ))}
    </ul>
  );
}

export default loading;
