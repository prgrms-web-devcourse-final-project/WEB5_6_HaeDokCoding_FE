import Link from 'next/link';
import Image from 'next/image';

function HeaderLogo() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:relative sm:left-auto sm:top-auto sm:translate-x-0 sm:translate-y-0">
      <Link href="/" aria-label="Ssoul 메인으로 이동">
        <Image
          src="/logo.svg"
          alt="Ssoul 로고"
          width={82}
          height={26}
          className="w-[62px] md:w-[82px] h-auto"
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </Link>
    </div>
  );
}

export default HeaderLogo;
