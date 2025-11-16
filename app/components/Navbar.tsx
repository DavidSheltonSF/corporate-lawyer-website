'use client';

import { NavbarItem } from './NavbarItem';

export function Navbar() {
  function toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu?.classList.toggle('active');
  }

  return (
    <nav className="absolute top-0 flex justify-between items-center bg-[var(--black-color)]/48 w-full h-auto py-[4px] px-[40px] max-md:px-[24px]">
      <div>
        <a href="#">
          <img
            className="size-[56px] lg:size-[40px]"
            src="./website-logo-with-circle-72px.webp"
            alt="website-logo"
          />
        </a>
      </div>
      <div className="navbar-menu flex justify-center absolute lg:static left-0 top-[100%] w-full lg:w-auto bg-[var(--black-color)]/75 lg:bg-transparent h-0 lg:h-auto overflow-hidden transition-height duration-300">
        <ul className="flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[24px] text-color-white text-[1.5rem] lg:text-[1rem]">
          <NavbarItem name="Início" link="/" />
          <NavbarItem name="Contato" link="#" />
          <NavbarItem name="Blog" link="#" />
          <NavbarItem name="Página do Cliente" link="#" />
        </ul>
      </div>
      <button className="min-md:hidden" onClick={toggleMenu}>
        <img className="size-[48px]" src="icons/menu.svg" alt="" />
      </button>
    </nav>
  );
}
