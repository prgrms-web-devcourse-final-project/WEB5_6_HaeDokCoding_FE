'use client';

import SelectBox from '@/domains/shared/components/select-box/SelectBox';

const SELECT_OPTIONS = [
  {
    id: 'abv',
    option: ['도수 전체', '약한 도수', '가벼운 도수', '중간 도수', '센 도수', '매우 센 도수'],
    title: '도수',
  },
  {
    id: 'base',
    option: ['베이스 전체', '위스키', '진', '럼', '보드카', '데킬라', '리큐르'],
    title: '베이스',
  },
  {
    id: 'glass',
    option: ['글라스 전체', '클래식', '롱', '슈터', '숏'],
    title: '글라스',
  },
];

function Accordion() {
  return (
    <ul className="flex w-full gap-3">
      {SELECT_OPTIONS.map(({ id, option, title }) => {
        return (
          <li key={id}>
            <SelectBox option={option} title={title} id={id} groupKey="filter" />
          </li>
        );
      })}
    </ul>
  );
}
export default Accordion;
