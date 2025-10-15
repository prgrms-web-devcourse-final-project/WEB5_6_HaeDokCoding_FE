'use client';

import AddIcon from '@/shared/assets/icons/add_24.svg';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import Button from '@/shared/components/button/Button';
import TagList from '../../components/tag/TagList';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TagType } from '@/domains/recipe/types/types';
import { useToast } from '@/shared/hook/useToast';
import Spinner from '@/shared/components/spinner/Spinner';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  tags: TagType[] | null;
  setTags: Dispatch<SetStateAction<TagType[] | null>>;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  debouncedFetch: (keyword: string) => void;
};

function TagModal({
  isOpen,
  setIsOpen,
  tags,
  setTags,
  selectedTags,
  setSelectedTags,
  debouncedFetch,
}: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toastError } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setSearchKeyword('');
      setTags(null);
    }
  }, [isOpen, setTags]);

  const handleAddTags = (tag: TagType) => {
    if (selectedTags.includes(tag.cocktailNameKo)) return;
    if (selectedTags.length >= 5) {
      toastError('태그는 5개까지 가능해요!');
      return;
    }
    setIsLoading(true);
    if (tag) setSelectedTags((prev) => [...prev, tag.cocktailNameKo]);
    setIsLoading(false);
  };

  if (isLoading) <Spinner />;

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
        onChange={(e) => {
          const keyword = e.target.value;
          setSearchKeyword(keyword);
          debouncedFetch(keyword);
        }}
      />
      <div className="mt-5">
        <TagList
          hasDelete={true}
          tags={selectedTags}
          setTags={(namesOrUpdater) => {
            const names =
              typeof namesOrUpdater === 'function' ? namesOrUpdater(selectedTags) : namesOrUpdater;
            setSelectedTags(names);
          }}
        />
      </div>
      <div className="mt-5 flex items-center justify-center">
        <ul className="p-2 rounded-xl grid md:grid-cols-4 grid-cols-2 gap-3 w-full max-w-[560px] md:max-h-[390px] max-h-[270px] overflow-y-auto custom-scrollbar will-change-scroll">
          {tags && tags.length > 0 ? (
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
            ))
          ) : (
            <div className="col-span-full text-center p-5 text-gray-500">
              {searchKeyword.trim() === '' ? '검색어를 입력해주세요.' : '검색 결과가 없습니다.'}
            </div>
          )}
          {/* {filteredTags.length === 0 && (
            <div className="text-center p-5 text-gray-500">검색 결과가 없습니다.</div>
          )} */}
        </ul>
      </div>
    </ModalLayout>
  );
}

export default TagModal;
