import { debounce } from '@/shared/utills/debounce';
import { useEffect, useMemo, useState } from 'react';

interface UseSearchControlProps {
  delay?: number;
  storageKey?: string; // 검색 상태 저장용 키
}

function useSearchControl({ delay = 300, storageKey }: UseSearchControlProps) {
  // 초기값을 sessionStorage에서 복원
  const [inputValue, setInputValue] = useState(() => {
    if (typeof window === 'undefined' || !storageKey) return '';
    const saved = sessionStorage.getItem(`${storageKey}_search`);
    return saved ? JSON.parse(saved).inputValue : '';
  });

  const [keyword, setKeyword] = useState(() => {
    if (typeof window === 'undefined' || !storageKey) return '';
    const saved = sessionStorage.getItem(`${storageKey}_search`);
    return saved ? JSON.parse(saved).keyword : '';
  });

  const [noResults, setNoResults] = useState(false);

  const isSearching = keyword.trim().length > 0;

  // 검색 상태를 sessionStorage에 저장
  useEffect(() => {
    if (!storageKey) return;
    sessionStorage.setItem(
      `${storageKey}_search`,
      JSON.stringify({
        inputValue,
        keyword,
      })
    );
  }, [inputValue, keyword, storageKey]);

  const debouncedKeyword = useMemo(() => debounce((v: string) => setKeyword(v), delay), [delay]);

  const onInputChange = (v: string) => {
    setInputValue(v);
    debouncedKeyword(v);
  };

  // 검색 상태 초기화 함수
  const resetSearch = () => {
    setInputValue('');
    setKeyword('');
    setNoResults(false);
    if (storageKey) {
      sessionStorage.removeItem(`${storageKey}_search`);
    }
  };

  return {
    inputValue,
    keyword,
    isSearching,
    onInputChange,
    noResults,
    setNoResults,
    resetSearch,
  };
}

export default useSearchControl;
