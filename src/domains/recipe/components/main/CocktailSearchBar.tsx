import Input from '@/shared/components/Input-box/Input';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function CocktailSearchBar({ value, onChange }: Props) {
  return (
    <Input
      placeholder="내용을 입력해 주세요."
      id="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="search"
      className="w-full md:max-w-80"
    />
  );
}
export default CocktailSearchBar;
