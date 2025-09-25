import EditDelete from '../EditDelete';
import Profile from '../Profile';

function CommentHeader() {
  return (
    <div>
      <Profile />
      <p>3분 전</p>
      <EditDelete />
    </div>
  );
}

export default CommentHeader;
