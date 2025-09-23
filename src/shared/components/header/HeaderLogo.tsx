import Link from 'next/link';
import Image from 'next/image';

function HeaderLogo() {
  return (
    <div>
      <Link href="/" aria-label="Ssoul 메인으로 이동">
        <Image
          src="/logo.svg"
          alt="Ssoul 로고"
          width={82}
          height={26}
          className="w-[62px] md:w-[82px] h-auto"
        />
      </Link>
    </div>
  );
}

export default HeaderLogo;
