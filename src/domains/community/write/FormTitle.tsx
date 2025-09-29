function FormTitle() {
  return (
    <div className="w-full h-[69px] relative border-b-1 border-gray mt-5 flex items-end pb-2">
      <label id="title-label" htmlFor="writingTitle" className="sr-only">
        글 제목
      </label>
      <input
        className="w-full text-2xl px-1 focus:outline-none "
        placeholder="제목을 입력해주세요."
        name="writingTitle"
        id="writingTitle"
        maxLength={20}
        aria-describedby="title-count"
      />
      <span id="title-count" aria-live="polite" className="text-gray ">
        0/20
      </span>
    </div>
  );
}

export default FormTitle;
