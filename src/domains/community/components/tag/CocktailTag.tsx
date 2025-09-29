import Tag from './Tag';
import TagList from './TagList';

function CocktailTag({ use }: { use: 'write' | 'detail' }) {
  return (
    <div
      role="list"
      className={`flex sm:gap-5 gap-2 sm:flex-row flex-col justify-center sm:items-center items-start sm:mb-0 mb-2 transition-all ease-in `}
    >
      <Tag use={use} />
      <TagList />
    </div>
  );
}

export default CocktailTag;
