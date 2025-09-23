import Link from 'next/link';
import Icon from '@/shared/assets/icons/github_32.svg';

function Github() {
  return (
    <div className="cursor-pointer hover:opacity-80 transition-opacity">
      <Link
        href="https://github.com/prgrms-web-devcourse-final-project/WEB5_6_HaeDokCoding_FE"
        target="_blank"
        aria-label="깃허브 링크"
      >
        <Icon />
      </Link>
    </div>
  );
}

export default Github;
