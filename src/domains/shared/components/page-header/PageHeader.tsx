import StarBg from '../star-bg/StarBg';

interface Props {
  title: string;
  description: string;
}

function PageHeader({ title, description }: Props) {
  return (
    <StarBg className="relative h-40 md:h-65 lg:h-80">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="text-center text-nowrap font-serif font-bold flex flex-col absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-9 lg:bottom-[55px]">
          <h1 className="text-shadow-[0_0_12px_#1a1a1a]  text-3xl md:text-5xl lg:text-3xl lg:text-[64px]">
            {title}
          </h1>
          <p className="text-shadow-[0_0_12px_#1a1a1a] text-lg md:text-xl lg:text-2xl">
            {description}
          </p>
        </div>
      </div>
    </StarBg>
  );
}
export default PageHeader;
