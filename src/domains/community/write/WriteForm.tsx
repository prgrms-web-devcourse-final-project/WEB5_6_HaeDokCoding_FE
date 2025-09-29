function WriteForm() {
  return (
    <form className="mt-5">
      <label htmlFor="content" className="sr-only">
        글 내용
      </label>
      <div
        contentEditable
        id="content"
        role="textbox"
        aria-multiline="true"
        tabIndex={0}
        className="w-full min-h-80 max-h-120 overflow-y-auto no-scrollbar bg-white rounded-3xl focus:outline-none py-7 px-5 text-primary"
      ></div>
    </form>
  );
}

export default WriteForm;
