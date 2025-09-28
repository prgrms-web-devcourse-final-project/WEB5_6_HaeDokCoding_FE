import PostCard from '@/domains/community/main/PostCard';

function MyPost() {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <PostCard label="레시피"></PostCard>
      <PostCard label="팁"></PostCard>
      <PostCard label="레시피"></PostCard>
    </div>
  );
}
export default MyPost;
