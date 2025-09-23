import Link from 'next/link';
import Image from 'next/image';

function HeaderLogo() {
  return (
    <div>
      <Link href="/" aria-label="Ssoul 메인으로 이동">
        <Image
          src="/logo.svg"
          alt="Ssoul 로고"
          width={60}
          height={19}
          className="md:w-[82px] sm:h-[26px]"
        />
      </Link>
    </div>
  );
}

export default HeaderLogo;
