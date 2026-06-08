'use client';

import { useEffect, useRef, useState } from 'react';
import { NavbarItem } from './NavbarItem';
import { NavbarMobileMenuButton } from '../../NavbarMobileMenuButton';
import { NavbarList } from './NavbarList';
import Link from 'next/link';

PublicNavbar.List = NavbarList;
PublicNavbar.Item = NavbarItem;

export function PublicNavbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: TouchEvent) {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener('touchstart', handleClickOutside);

    return () => document.removeEventListener('touchstart', handleClickOutside);
  });

  return (
    <nav
      ref={navbarRef}
      className="flex relative justify-between items-center bg-color-primary w-full h-auto py-[4px] px-[24px] lg:px-[40px]"
    >
      <div>
        <Link href="/">
          <img className="size-[56px]" src="/website-logo.webp" alt="Medeiros e Santiago" />
        </Link>
      </div>
      <PublicNavbar.List menuIsOpen={menuIsOpen}>
        <PublicNavbar.Item name="Início" link="/" />
        <PublicNavbar.Item name="Página do Cliente" link="/login" />
      </PublicNavbar.List>
      <NavbarMobileMenuButton menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
    </nav>
  );
}
