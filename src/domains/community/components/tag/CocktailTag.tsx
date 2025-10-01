import Tag from './Tag';
import TagList from './TagList';

type Props = {
  use: 'write' | 'detail';
  tags: string[];
};

function CocktailTag({ use, tags }: Props) {
  return (
    <div
      role="list"
      className={`flex sm:gap-5 gap-2 sm:flex-row flex-col justify-center sm:items-center items-start sm:mb-0 mb-2 transition-all ease-in `}
    >
      <Tag use={use} />
      <TagList tags={tags} />
    </div>
  );
}

export default CocktailTag;
