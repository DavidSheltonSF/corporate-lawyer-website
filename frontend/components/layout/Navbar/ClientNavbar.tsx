'use client';

import { useEffect, useRef, useState } from 'react';
import { NavbarItem } from './NavbarItem';
import { NavbarMobileMenuButton } from '../../NavbarMobileMenuButton';
import { NavbarList } from './NavbarList';
import Link from 'next/link';

ClientNavbar.List = NavbarList;
ClientNavbar.Item = NavbarItem;

export function ClientNavbar() {
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
      className="flex z-30 relative justify-between items-center bg-color-primary w-full h-auto py-[4px] px-[24px] lg:px-[40px]"
    >
      <div>
        <Link href="/">
          <img className="size-[56px]" src="/website-logo.webp" alt="Medeiros e Santiago" />
        </Link>
      </div>
      <ClientNavbar.List menuIsOpen={menuIsOpen}>
        <ClientNavbar.Item name="Início" link="/client/dashboard" />
        <ClientNavbar.Item name="Processos" link="/client/processos" />
        <ClientNavbar.Item name="Clientes" link="/client/clientes" />
      </ClientNavbar.List>
      <NavbarMobileMenuButton menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
    </nav>
  );
}
