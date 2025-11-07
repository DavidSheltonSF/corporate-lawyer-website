'use client';

import { useState } from 'react';
import { SubNavbarItem } from './SubNavbarItem';

export function SubNavbar() {
  const [selected, setSelected] = useState(0);

  return (
    <nav className="flex items-center justify-center w-full h-[56px] bg-color-primary">
      <ul className="flex items-center justify-center gap-[24px] h-[90%]">
        <SubNavbarItem index={0} name="Sobre nós" selected={selected} setSelected={setSelected} />
        <SubNavbarItem index={1} name="Serviços" selected={selected} setSelected={setSelected} />
        <SubNavbarItem index={2} name="Equipe" selected={selected} setSelected={setSelected} />
      </ul>
    </nav>
  );
}
