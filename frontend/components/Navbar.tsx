'use client';

import { useState } from 'react';
import { NavbarItem } from './NavbarItem';
import { NavbarMobileMenuButton } from './NavbarMobileMenuButton';
import { NavbarList } from './NavbarList';
import Link from 'next/link';

export function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 flex justify-between items-center bg-[var(--black-color)]/48 w-full h-auto py-[4px] px-[24px] lg:px-[40px]">
      <div>
        <Link href="/">
          <img
            className="size-[56px]"
            src="/website-logo-with-circle-72px.webp"
            alt="Medeiros e Santiago"
          />
        </Link>
      </div>
      <NavbarList menuIsOpen={menuIsOpen}>
        <NavbarItem name="Início" link="/" />
        <NavbarItem name="Contato" link="/contact" />
        <NavbarItem name="Página do Cliente" link="/clientPageLogin" />
      </NavbarList>
      <NavbarMobileMenuButton menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
    </nav>
  );
}
