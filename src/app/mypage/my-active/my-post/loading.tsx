import SkeletonPostCard from '@/domains/shared/skeleton/SkeletonPostCard';

function Loading() {
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

export default Loading;
