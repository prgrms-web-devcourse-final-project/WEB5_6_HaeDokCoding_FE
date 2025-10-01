function Label({ title }: { title: string }) {
  const bgColors: Record<string, string> = {
    레시피: 'bg-[#FFE4E6]',
    팁: 'bg-[#EDE9FE]',
    질문: 'bg-[#E0F2FE]',
    자유: 'bg-[#D1FAE5]',
    논알콜: 'bg-stone-100',
    '약한 도수': 'bg-rose-50',
    '가벼운 도수': 'bg-rose-200',
    '중간 도수': 'bg-rose-300',
    '센 도수': 'bg-red-400 text-white',
    '매우 센 도수': 'bg-red-600 text-white',
  };

  return (
    <span
      role="status"
      aria-label={title}
      className={` text-primary py-0.5 px-1.5 rounded-md text-sm ${bgColors[title] ? bgColors[title] : 'bg-white'}`}
    >
      {title}
    </span>
  );
}

export default Label;
