import PostCard from '@/domains/community/main/PostCard';

function MyPost() {
  return (
    <ul>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
      <li>
        <PostCard label="팁"></PostCard>
      </li>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
    </ul>
  );
}
export default MyPost;
