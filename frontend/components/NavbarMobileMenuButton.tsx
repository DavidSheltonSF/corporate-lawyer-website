import { Dispatch, SetStateAction } from 'react';
import { MobileMenuIcon } from './icons/MobileMenuIcon';
import { CloseIcon } from './icons/CloseIcon';

interface Props {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function NavbarMobileMenuButton({ menuIsOpen, setMenuIsOpen }: Props) {
  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }
  return (
    <button className="min-lg:hidden" onClick={toggleMenu}>
      {!menuIsOpen ? (
        <MobileMenuIcon className="size-[48px] stroke-color-white" />
      ) : (
        <CloseIcon className="size-[48px] stroke-color-white" />
      )}
    </button>
  );
}
