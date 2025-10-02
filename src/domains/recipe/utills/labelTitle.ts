export const labelTitle = (title: string | null | undefined) => {
  if (!title) return;
  const labelTitle = title?.replace(/\(\d+(~\d+)?%\~?\)/g, '').trim();

  return labelTitle;
};
