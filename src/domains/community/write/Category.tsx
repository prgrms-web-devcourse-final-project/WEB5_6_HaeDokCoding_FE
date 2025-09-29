import SelectBox from '@/domains/shared/components/select-box/SelectBox';

function Category() {
  return (
    <div className="w-full h-[38px] flex items-center justify-end mt-10">
      <SelectBox option={['레시피', '팁', '질문', '자유']} title="카테고리" use="write" />
    </div>
  );
}

export default Category;
