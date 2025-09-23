import Link from 'next/link';
import Logo from '../../../public/logo.svg';

function HeaderLogo() {
  return (
    <div>
      <Link href="/">
        <Logo aria-label="Ssoul 홈페이지로 이동" />
      </Link>
    </div>
  );
}

export default HeaderLogo;
