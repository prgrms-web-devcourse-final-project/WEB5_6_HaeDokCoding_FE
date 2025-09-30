import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';

interface Props {
  title: string;
  isClick: number;
  index: number;
  role: string;
  type?: 'default' | 'underLine';
  id: string;
  tabIndex: number;
  'aria-selected'?: 'true' | 'false';
  'aria-controls'?: string;
}

export const TabClass = cva(
  `
  w-fit duration-300 
  `,
  {
    variants: {
      type: {
        default: 'px-3 py-0.5 inset-ring-1 rounded-full ',
        underLine: 'text-base md:text-lg border-b-2 border-transparent',
      },
      isActive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        type: 'default',
        isActive: true,
        class: 'bg-secondary text-primary',
      },
      {
        type: 'underLine',
        isActive: true,
        class: 'text-secondary border-b-2 font-bold border-secondary',
      },
      {
        type: 'default',
        isActive: false,
        class: 'hover:bg-secondary/50',
      },
      {
        type: 'underLine',
        isActive: false,
        class: 'hover:text-secondary/50',
      },
    ],
    defaultVariants: {
      type: 'default',
      isActive: false,
    },
  }
);

function TabMenu({ title, isClick, role, type, index, id, ...rest }: Props) {
  const isActive = index == isClick;

  return (
    <button id={id} role={role} className={tw(TabClass({ type, isActive }))} {...rest}>
      {title}
    </button>
  );
}
export default TabMenu;
