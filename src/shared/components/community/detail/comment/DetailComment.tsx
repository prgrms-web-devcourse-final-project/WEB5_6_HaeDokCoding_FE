import Input from '../../../InputBox/Input';

function DetailComment() {
  return (
    <section aria-label="댓글">
      <p>댓글 2</p>
      <div>
        <Input placeholder="댓글로 의견을 남겨주세요" id="community-comment" />
      </div>
    </section>
  );
}

export default DetailComment;
