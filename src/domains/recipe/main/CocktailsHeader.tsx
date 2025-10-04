'use client';
import Input from '@/shared/components/Input-box/Input';
import Accordion from '../components/main/Accordion';

interface Props {
  keyword: string;
  setKeyword: (v: string) => void;
}

function CocktailsHeader({ keyword, setKeyword }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    console.log(target);
  };

  return (
    <section className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
      <Accordion />
      <Input
        placeholder="내용을 입력해 주세요."
        id="search"
        value={keyword}
        onChange={(e) => handleChange}
        variant="search"
        className="w-full md:max-w-80"
      />
    </section>
  );
}
export default CocktailsHeader;
