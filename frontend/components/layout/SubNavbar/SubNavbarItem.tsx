'use client';

import { Text } from '@/components/ui/Text';
import { useState } from 'react';

interface Props {
  index: number;
  label: string;
  selected?: number;
  setSelected?: any;
}

export function SubNavbarItem(props: Props) {
  const { index, label, selected, setSelected } = props;
  const [isOver, setOver] = useState(false);

  function handleClick() {
    setSelected(index);
  }

  function handleMouseEnter() {
    setOver(true);
  }

  function handleMouseOut() {
    setOver(false);
  }

  const isSelected = index === selected;
  return (
    <li
      className="flex shrink-0 relative cursor-pointer justify-center items-center h-full"
      onClick={handleClick}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
      <Text variant="h3" className="text-nowrap text-color-white large-text ">
        {label}
      </Text>
      <span
        className={`absolute bottom-0 bg-color-secondary h-[2px] transition-all ${
          isOver || isSelected ? 'left-0 w-full' : 'right-0 w-0'
        }`}
      ></span>
    </li>
  );
}
