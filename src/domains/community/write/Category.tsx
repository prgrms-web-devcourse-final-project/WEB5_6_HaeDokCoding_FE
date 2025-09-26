import SelectBox from '@/domains/shared/select-box/SelectBox';

function Category() {
  return (
    <div>
      <SelectBox option={['레시피', '팁', '질문', '자유']} title="카테고리" />
    </div>
  );
}

export default Category;
