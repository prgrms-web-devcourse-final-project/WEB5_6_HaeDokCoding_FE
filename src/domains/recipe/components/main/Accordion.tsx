'use client';

import SelectBox from '@/shared/components/select-box/SelectBox';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface Props {
  setAlcoholBaseTypes: Dispatch<SetStateAction<string[]>>;
  setAlcoholStrengths: Dispatch<SetStateAction<string[]>>;
  setCocktailTypes: Dispatch<SetStateAction<string[]>>;
}

const SELECT_OPTIONS = [
  {
    id: 'abv',
    option: [
      '전체',
      '논알콜',
      '약한 도수 (1~5%)',
      '가벼운 도수 (6~15%)',
      '중간 도수(16~25%)',
      '센 도수(26~36%)',
      '매우 센 도수(36%~)',
    ],
    map: {
      전체: null,
      논알콜: 'NON_ALCOHOLIC',
      '약한 도수 (1~5%)': 'WEAK',
      '가벼운 도수 (6~15%)': 'LIGHT',
      '중간 도수(16~25%)': 'MEDIUM',
      '센 도수(26~36%)': 'STRONG',
      '매우 센 도수(36%~)': 'VERY_STRONG',
    },
    title: '도수',
  },
  {
    id: 'base',
    option: ['전체', '위스키', '브랜디', '진', '럼', '보드카', '데킬라', '리큐르', '와인', '기타'],
    map: {
      전체: null,
      진: 'GIN',
      럼: 'RUM',
      보드카: 'VODKA',
      위스키: 'WHISKY',
      데킬라: 'TEQUILA',
      리큐르: 'LIQUEUR',
      브랜디: 'BRANDY',
      와인: 'WINE',
      기타: 'OTHER',
    },
    title: '베이스',
  },
  {
    id: 'glass',
    option: ['전체', '클래식', '롱', '슈터', '숏'],
    map: {
      전체: null,
      숏: 'SHORT',
      롱: 'LONG',
      클래식: 'CLASSIC',
      슈터: 'SHOOTER',
    },
    title: '글라스',
  },
];

function Accordion({ setAlcoholBaseTypes, setCocktailTypes, setAlcoholStrengths }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // url 파라미터에서 값을 가져와 POST를 도와줌
  useEffect(() => {
    const abv = searchParams.get('abv');
    const base = searchParams.get('base');
    const glass = searchParams.get('glass');

    setAlcoholStrengths(abv ? [abv] : []);
    setAlcoholBaseTypes(base ? [base] : []);
    setCocktailTypes(glass ? [glass] : []);
  }, [searchParams, setAlcoholStrengths, setAlcoholBaseTypes, setCocktailTypes]);

  // 파라미터 값을 한글로 역 변환해주는 함수
  const getDisplayValue = (id: string, code: string | null): string => {
    if (!code) return '전체';

    const optionGroup = SELECT_OPTIONS.find((opt) => opt.id === id);
    if (!optionGroup) return '전체';

    // map 객체에서 code와 일치하는 key(한글)를 찾기
    const entry = Object.entries(optionGroup.map).find(([_, value]) => value === code);
    return entry ? entry[0] : '전체';
  };

  // URL 파라미터에서 현재 선택된 값 가져오기 아코디언 UI에 적용
  const currentValues = useMemo(() => {
    return {
      abv: getDisplayValue('abv', searchParams.get('abv')),
      base: getDisplayValue('base', searchParams.get('base')),
      glass: getDisplayValue('glass', searchParams.get('glass')),
    };
  }, [searchParams]);

  const handleSelect = (id: string, value: string) => {
    const optionGroup = SELECT_OPTIONS.find((opt) => opt.id === id);
    if (!optionGroup) return;

    // 선택한 옵션의 밸류를 전달
    const code = optionGroup.map[value as keyof typeof optionGroup.map] ?? null;
    const arr = code ? [code] : [];

    // 상태 즉시 업데이트
    switch (id) {
      case 'abv':
        setAlcoholStrengths(arr);
        break;
      case 'base':
        setAlcoholBaseTypes(arr);
        break;
      case 'glass':
        setCocktailTypes(arr);
        break;
    }

    // URL 업데이트
    const params = new URLSearchParams(searchParams.toString());

    if (code) {
      params.set(id, code);
    } else {
      params.delete(id);
    }

    const queryString = params.toString();
    const newUrl = `${pathname}?${queryString}`;

    router.push(newUrl);
    // shallow routing으로 URL만 변경
    // window.history.pushState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  };

  return (
    <ul className="flex w-full gap-3">
      {SELECT_OPTIONS.map(({ id, option, title }) => {
        const currentValue = currentValues[id as keyof typeof currentValues];

        return (
          <li key={id}>
            <SelectBox
              option={option}
              title={title}
              id={id}
              groupKey="filter"
              value={currentValue} // 현재 선택된 값 전달
              onChange={(value) => handleSelect(id, value)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Accordion;
