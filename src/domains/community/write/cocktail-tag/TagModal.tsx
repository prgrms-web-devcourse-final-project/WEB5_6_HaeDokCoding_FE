'use client';

import AddIcon from '@/shared/assets/icons/add_24.svg';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import Button from '@/shared/components/button/Button';
import TagList from '../../components/tag/TagList';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { TagType } from '@/domains/recipe/types/types';
import { getApi } from '@/app/api/config/appConfig';
import { debounce } from '@/shared/utills/debounce';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  tags: TagType[] | null;
  setTags: Dispatch<SetStateAction<TagType[] | null>>;
  selectedTags: TagType[];
  setSelectedTags: Dispatch<SetStateAction<TagType[]>>;
};

function TagModal({ isOpen, setIsOpen, tags, setTags, selectedTags, setSelectedTags }: Props) {
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchKeyword('');
      setTags(null);
    }
  }, [isOpen, setTags]);

  const handleAddTags = (tag: TagType) => {
    console.log(tag);
    const alreadySelected = selectedTags.some((t) => t.cocktailId === tag.cocktailId);
    if (alreadySelected) return;
    setSelectedTags((prev) => [...(prev || []), tag]);
  };

  const fetchTags = useCallback(
    async (v?: string) => {
      const keyword = v?.trim() ?? '';
      const body = {
        keyword,
        page: 0,
        size: 100,
      };
      try {
        const res = await fetch(`${getApi}/cocktails/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        console.log(data);
        setTags(data.data); // 서버에서 받은 필터링된 태그 목록 저장
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    [setTags]
  );

  const debouncedFetch = useMemo(() => debounce(fetchTags, 300), [fetchTags]);

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
