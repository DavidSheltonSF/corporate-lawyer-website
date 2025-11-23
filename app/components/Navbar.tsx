'use client';

import { useState } from 'react';
import { NavbarItem } from './NavbarItem';
import { NavbarMobileMenuButton } from './NavbarMobileMenuButton';
import { NavbarList } from './NavbarList';

export function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 flex justify-between items-center bg-[var(--black-color)]/48 w-full h-auto py-[4px] px-[24px] lg:px-[40px]">
      <div>
        <a href="/">
          <img
            className="size-[56px]"
            src="./website-logo-with-circle-72px.webp"
            alt="Medeiros e Santiago"
          />
        </a>
      </div>
      <NavbarList menuIsOpen={menuIsOpen}>
        <NavbarItem name="Início" link="/" />
        <NavbarItem name="Contato" link="/contact" />
        <NavbarItem name="Blog" link="#" />
        <NavbarItem name="Página do Cliente" link="#" />
      </NavbarList>
      <NavbarMobileMenuButton menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
    </nav>
  );
}
