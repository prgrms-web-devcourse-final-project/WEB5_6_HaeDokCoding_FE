import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Tag from './Tag';
import TagList from './TagList';
import { TagType } from '../../write/WriteSection';

type Props = {
  use: 'write' | 'detail';
  selectedTags: TagType[] | string[];
  setSelectedTags?: Dispatch<SetStateAction<TagType[]>>;
  onClick?: () => void;
};

function CocktailTag({ use, selectedTags, setSelectedTags, onClick }: Props) {
  // 타입 가드: write인 경우만 TagType[]
  const isWrite = use === 'write';

  const handleTagUpdate = useCallback(
    (value: string[] | ((prev: string[]) => string[])) => {
      if (!setSelectedTags) return;

      if (Array.isArray(value)) {
        setSelectedTags((prev) => prev.filter((tag) => value.includes(tag.cocktailNameKo)));
      } else {
        setSelectedTags((prev) => {
          const cocktailNames = prev.map((tag) => tag.cocktailNameKo);
          const updatedNames = value(cocktailNames);
          return prev.filter((tag) => updatedNames.includes(tag.cocktailNameKo));
        });
      }
    },
    [setSelectedTags]
  );

  return (
    <div
      role="list"
      className={`flex sm:gap-5 gap-2 sm:flex-row flex-col justify-start sm:items-center items-start sm:mb-0 mb-2 transition-all ease-in `}
    >
      <Tag use={use} onClick={onClick} />
      <TagList
        tags={
          isWrite
            ? (selectedTags as TagType[]).map((tag) => tag.cocktailNameKo)
            : (selectedTags as string[])
        }
        setTags={isWrite && setSelectedTags ? handleTagUpdate : undefined}
        hasDelete={isWrite}
      />
    </div>
  );
}

export default React.memo(CocktailTag);
