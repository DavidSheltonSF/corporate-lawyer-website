'use client'

import React, { useState } from "react";

interface Props {
  index: number;
  name: string;
  selected: number
  setSelected: any
}

export function SubNavbarItem(props: Props) {
  const { index, name, selected, setSelected } = props
   const [isOver, setOver] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLElement>){
    setSelected(index);
  }

  function handleMouseEnter() {
    setOver(true)
  }

  function handleMouseOut(e: React.MouseEvent<HTMLElement>) {
    setOver(false)
  }

  const isSelected = index === selected;
  return (
     <li className="flex flex-col justify-between items-between h-full" onClick={handleClick} onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut}>
       <span className="text-color-white text-[24px] mt-[5px]">
        {name}
        </span>
      <span className={`NavSelectionBar bg-color-secondary h-[4px] transition-all ${ isOver || isSelected ? 'ml-0 mr-auto w-full' : 'ml-auto mr-0 w-0'}`}>
      </span>
    </li>
  )
}