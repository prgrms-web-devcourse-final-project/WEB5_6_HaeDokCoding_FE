import Shooter from '@/shared/assets/icons/shooter_36.svg';
import Short from '@/shared/assets/icons/short_36.svg';
import Long from '@/shared/assets/icons/long_36.svg';
import Classic from '@/shared/assets/icons/classic_36.svg';

const useGlass = (glass: string) => {
  switch (glass) {
    case '슈터':
      return <Shooter />;
    case '숏':
      return <Short />;
    case '롱':
      return <Long />;
    case '클래식':
      return <Classic />;
  }
};
export default useGlass;
