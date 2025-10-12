import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Tag from './Tag';
import TagList from './TagList';
import { TagType } from '@/domains/recipe/types/types';

type Props = {
  use: 'write' | 'detail';
  selectedTags: string[];
  setSelectedTags?: Dispatch<SetStateAction<string[]>>;
  onClick?: () => void;
};

function CocktailTag({ use, selectedTags, setSelectedTags, onClick }: Props) {
  // 타입 가드: write인 경우만 TagType[]
  const isWrite = use === 'write';

  const handleTagUpdate = useCallback(
    (newTags: string[] | ((prev: string[]) => string[])) => {
      if (!setSelectedTags) return;
      setSelectedTags(newTags);
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
        tags={selectedTags}
        setTags={setSelectedTags ? handleTagUpdate : undefined}
        hasDelete={use === 'write'}
      />
    </div>
  );
}

export default React.memo(CocktailTag);
