'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Props {
  name: string;
  link: string;
}

export function NavbarItem(props: Props) {
  const { name, link } = props;
  const [isOver, setOver] = useState(false);

  function handleMouseEnter() {
    setOver(true);
  }

  function handleMouseOut() {
    setOver(false);
  }

  return (
    <li
      className="flex flex-col justify-between items-between"
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
      <Link href={`${link}`} className="text-color-white">
        {name}
      </Link>
      <span
        className={`bg-color-white h-[2px] transition-all ${
          isOver ? 'ml-0 mr-auto w-full' : 'ml-auto mr-0 w-0'
        }`}
      ></span>
    </li>
  );
}
