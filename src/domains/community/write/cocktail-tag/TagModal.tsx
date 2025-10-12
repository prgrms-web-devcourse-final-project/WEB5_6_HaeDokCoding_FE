'use client';

import AddIcon from '@/shared/assets/icons/add_24.svg';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import Button from '@/shared/components/button/Button';
import TagList from '../../components/tag/TagList';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TagType } from '../WriteSection';
import { getApi } from '@/app/api/config/appConfig';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  tags: TagType[] | null;
  setTags: Dispatch<SetStateAction<TagType[] | null>>;
  selectedTags: TagType[];
  setSelectedTags: Dispatch<SetStateAction<TagType[]>>;
};

function TagModal({ isOpen, setIsOpen, tags, setTags, selectedTags, setSelectedTags }: Props) {
  const handleAddTags = (tag: TagType) => {
    console.log(tag);
    const alreadySelected = selectedTags.some((t) => t.cocktailId === tag.cocktailId);
    if (alreadySelected) return;
    setSelectedTags((prev) => [...(prev || []), tag]);
  };

  return (
    <ModalLayout
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="칵테일 태그"
      buttons={
        <Button
          className="-mt-4 -mb-4"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          저장
        </Button>
      }
    >
      <Input
        placeholder="칵테일 이름 또는 연관 키워드를 검색하세요."
        id="CocktailTag"
        className="w-full md:text-base text-sm"
        variant="search"
      />
      <div className="mt-5">
        <TagList
          hasDelete={true}
          tags={selectedTags.map((t) => t.cocktailNameKo)}
          setTags={(namesOrUpdater) => {
            const names =
              typeof namesOrUpdater === 'function'
                ? namesOrUpdater(selectedTags.map((t) => t.cocktailNameKo))
                : namesOrUpdater;
            setSelectedTags(tags ? tags.filter((tag) => names.includes(tag.cocktailNameKo)) : []);
          }}
        />
      </div>
      <div className="mt-5 flex items-center justify-center">
        <ul className="p-2 rounded-xl grid md:grid-cols-4 grid-cols-2 gap-3 w-full max-w-[560px] md:max-h-[450px] max-h-[330px] overflow-y-auto custom-scrollbar will-change-scroll">
          {tags &&
            tags.map((tag) => (
              <div className="relative" key={tag.cocktailId}>
                <CocktailCard
                  src={tag.cocktailImgUrl}
                  name={tag.cocktailName}
                  nameKo={tag.cocktailNameKo}
                  keep={false}
                  className="w-full md:h-[100px] h-[120px]"
                  textSize1="md:text-sm text-[10px] font-normal truncate md:w-24 w-18"
                  textSize2="md:text-[11px] text-[10px] font-normal truncate md:w-24 w-15"
                />
                <div className="absolute bottom-12 right-[1px]">
                  <button
                    type="button"
                    className="text-white hover:text-secondary/80"
                    onClick={() => handleAddTags(tag)}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </ModalLayout>
  );
}

export default TagModal;
