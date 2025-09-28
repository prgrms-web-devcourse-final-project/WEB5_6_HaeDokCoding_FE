import Image from 'next/image';
import Ssury from '@/shared/assets/ssury/ssury_level4.webp';
import AbvGraph from '@/domains/shared/components/abv-graph/AbvGraph';
import MyAbv from './MyAbv';

function MyProfile() {
  return (
    <section className="h-auto  p-6 bg-white rounded-2xl">
      <header className="flex flex-col gap-8 md:gap-3 md:flex-row md:justify-between ">
        <div className="flex flex-col pb-4 md:pb-0 border-b-1 border-gray md:border-b-0 md:flex-col gap-6">
          <div className="rounded-full w-17.5 h-17.5 flex items-center gap-2">
            <Image src={Ssury} alt="" />
            <p className="text-gray-dark text-2xl font-bold">UserName</p>
          </div>
          <ul className="flex gap-3 text-gray-dark text-xs">
            <li className="flex gap-1">
              <p>좋아요 0</p>
            </li>
            <span>|</span>
            <li className="flex gap-1">
              <p>글 0</p>
            </li>
            <span>|</span>
            <li className="flex gap-1">
              <p>댓글 0</p>
            </li>
            <span>|</span>
            <li className="flex gap-1">
              <p>칵테일 킵 0</p>
            </li>
          </ul>
        </div>
        <aside className="flex flex-col gap-2 md:pt-3">
          <MyAbv />
          <AbvGraph />
        </aside>
      </header>
    </section>
  );
}
export default MyProfile;
