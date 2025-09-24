function PostLabel({ title }: { title: string }) {
  return (
    <span
      role="status"
      aria-label={title}
      className={` text-primary py-1 px-2 rounded-md text-sm
            ${
              title === '레시피'
                ? 'bg-[#FFE4E6]'
                : title === '팁'
                  ? 'bg-[#EDE9FE]'
                  : title === '질문'
                    ? 'bg-[#E0F2FE]'
                    : title === '자유'
                      ? 'bg-[#D1FAE5]'
                      : ''
            }`}
    >
      {title}
    </span>
  );
}

export default PostLabel;
