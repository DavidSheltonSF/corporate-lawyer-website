import { ReactNode } from 'react';

interface Props {
  menuIsOpen: boolean;
  children: ReactNode;
}

export function NavbarList({ menuIsOpen, children }: Props) {
  return (
    <ul
      className={`flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[24px] text-color-white text-[1.5rem] absolute lg:static left-0 top-[100%] w-full lg:w-auto bg-[var(--black-color)]/75 lg:bg-transparent h-0 lg:h-auto overflow-hidden transition-height duration-300 ${
        menuIsOpen ? 'h-[30vh]' : ''
      }`}
    >
      {children}
    </ul>
  );
}
