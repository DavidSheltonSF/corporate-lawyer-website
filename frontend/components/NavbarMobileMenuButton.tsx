import { Dispatch, SetStateAction } from 'react';

interface Props {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function NavbarMobileMenuButton({ menuIsOpen, setMenuIsOpen }: Props) {
  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }
  return (
    <button className="min-md:hidden" onClick={toggleMenu}>
      <img className="size-[48px]" src={`/icons/${menuIsOpen ? 'close' : 'menu'}.svg`} alt="" />
    </button>
  );
}
