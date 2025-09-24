import { tabItem } from '@/shared/utills/tabItem';

function CommunityTab() {
  return (
    <div>
      <ul className="flex gap-3">
        {tabItem.map(({ title }) => (
          <li key={title} className="border-1 py-1 px-3 rounded-2xl">
            <button className="w-full h-full">{title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommunityTab;
