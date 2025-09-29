import ImageBox from '@/shared/assets/icons/imageBox_fill_24.svg';

function DragandClick() {
  return (
    <div className="border-3 border-dashed shrink-0 border-gray-light w-[80px] h-[80px]  rounded-xl cursor-pointer bg-gray-dark flex flex-col gap-3 items-center justify-center hover:bg-gray-dark/70">
      <ImageBox />
      <div className="flex items-center md:text-md text-sm">
        <span>0</span>
        <span>/</span>
        <span>10</span>
      </div>
    </div>
  );
}

export default DragandClick;
