import { navItem } from '@/shared/utills/navigation';
import tw from '@/shared/utills/tw';
import Link from 'next/link';

interface Props {
  pathname: string;
  className?: string;
}

function NavItem({ pathname, className }: Props) {

  return (
    <nav className={tw(className)}>
      <ul className="text-white flex gap-[24px] font-serif font-normal text-base md:text-lg">
        {navItem.map(({ href, label, className }) => (
          <li key={href} className={tw(className)}>
            <Link
              href={href}
              className={`${pathname === href ? 'text-tertiary' : 'hover:text-white/80'} transition-colors`}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavItem;
