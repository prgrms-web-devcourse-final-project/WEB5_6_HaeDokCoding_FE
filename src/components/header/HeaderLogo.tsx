import Link from 'next/link';
import Logo from '../../../public/logo.svg';

function HeaderLogo() {
  return (
    <div>
      <Link href="/">
        <Logo />
      </Link>
    </div>
  );
}

export default HeaderLogo;
