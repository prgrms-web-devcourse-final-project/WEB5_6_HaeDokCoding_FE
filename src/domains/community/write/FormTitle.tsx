function FormTitle() {
  return (
    <div>
      <label htmlFor="writingTitle"></label>
      <input placeholder="제목을 입력해주세요." name="글쓰기제목" id="writingTitle" />
      <span>0/20</span>
    </div>
  );
}

export default FormTitle;
