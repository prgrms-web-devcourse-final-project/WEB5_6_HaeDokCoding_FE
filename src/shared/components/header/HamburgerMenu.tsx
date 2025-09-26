import Menu from '@/shared/assets/icons/menu_32.svg';
import { useState } from 'react';
import DropdownMenu from './DropdownMenu';

function HamburgerMenu() {
  const [isClicked, setIsClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!visible) {
      setVisible(true);
    }
    setIsClicked(true);
  };

  return (
    <>
      <button
        type="button"
        className="sm:hidden block stroke-white hover:stroke-white/80"
        onClick={(e) => handleClick(e)}
        aria-label="메뉴 열기"
        aria-expanded={isClicked}
        aria-controls="mobile-dropdown-menu"
      >
        <Menu />
      </button>
      <DropdownMenu
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
}

export default HamburgerMenu;
