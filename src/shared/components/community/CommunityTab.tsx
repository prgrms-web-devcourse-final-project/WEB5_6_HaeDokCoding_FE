import { tabItem } from '@/shared/utills/tabItem';

function CommunityTab() {
  return (
    <div className="relative">
      <div className="min-w-[383px] overflow-x-auto no-scrollbar -mx-4 px-4">
        <ul className="flex gap-3">
          {tabItem.map(({ title }) => (
            <li key={title} className="border-1 py-1 px-3 rounded-2xl">
              <button className="w-full h-full">{title}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommunityTab;
