'use client'

import { NavbarItem } from './NavbarItem';

export function Navbar() {

  function toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu?.classList.toggle('active');
  }

  return (
    <nav className="absolute top-0 flex justify-between items-center bg-[var(--black-color)]/48 w-full h-[80px] px-[40px] max-md:px-[24px]">
      <div>
        <a href="#">
          <img
            className="size-[72px]"
            src="./website-logo-with-circle-72px.webp"
            alt="website-logo"
          />
        </a>
      </div>
      <div className="navbar-menu max-md:absolute max-md:w-full max-md:left-0 max-md:top-[100%] max-md:bg-[var(--black-color)]/48 max-md:h-0 max-md:overflow-hidden active">
        <ul className="flex max-md:flex-col items-center justify-center gap-[24px] text-color-white text-[24px]">
          <NavbarItem name="Início" link="/" />
          <NavbarItem name="Contato" link="/contact" />
          <NavbarItem name="Blog" link="#" />
          <NavbarItem name="Página do Cliente" link="#" />
        </ul>
      </div>
      <button className='min-lg:hidden' onClick={toggleMenu}>
        <img className="size-[48px]" src="icons/menu.svg" alt="" />
      </button>
    </nav>
  );
}
