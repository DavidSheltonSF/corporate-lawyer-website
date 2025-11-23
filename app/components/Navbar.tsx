'use client';

import { useState } from 'react';
import { NavbarItem } from './NavbarItem';

export function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <nav className="absolute top-0 flex justify-between items-center bg-[var(--black-color)]/48 w-full h-auto py-[4px] px-[24px] lg:px-[40px]">
      <div>
        <a href="#">
          <img
            className="size-[56px]"
            src="./website-logo-with-circle-72px.webp"
            alt="Medeiros e Santiago"
          />
        </a>
      </div>
      <ul
        className={`flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[24px] text-color-white text-[1.5rem] absolute lg:static left-0 top-[100%] w-full lg:w-auto bg-[var(--black-color)]/75 lg:bg-transparent h-0 lg:h-auto overflow-hidden transition-height duration-300 ${
          menuIsOpen ? 'h-[30vh]' : ''
        }`}
      >
        <NavbarItem name="Início" link="/" />
        <NavbarItem name="Contato" link="/contact" />
        <NavbarItem name="Blog" link="#" />
        <NavbarItem name="Página do Cliente" link="#" />
      </ul>
      <button className="min-md:hidden" onClick={toggleMenu}>
        <img className="size-[48px]" src={`icons/${menuIsOpen ? 'close' : 'menu'}.svg`} alt="" />
      </button>
    </nav>
  );
}
