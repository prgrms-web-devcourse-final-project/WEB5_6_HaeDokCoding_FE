import Link from 'next/link';
import Icon from '@/shared/assets/icons/github_32.svg';

function Github() {
  return (
    <div className="cursor-pointer hover:opacity-80 transition-opacity">
      <Link href="">
        <Icon />
      </Link>
    </div>
  );
}

export default Github;
