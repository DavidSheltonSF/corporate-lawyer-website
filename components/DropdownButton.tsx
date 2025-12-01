'use client';

import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  listItems: string[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}
export function DropDownButton({ listItems, selectedItem, setSelectedItem }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  function selectItem(item: string) {
    setSelectedItem(item);
    setIsOpen(false);
  }

  const renderItems = listItems.map((item, index) => (
    <li key={index}>
      <button
        className="text-start w-full bg-color-primary bg-inherit hover:brightness-120 cursor-pointer px-[16px] py-[4px]"
        onClick={() => {
          selectItem(item);
        }}
      >
        {item}
      </button>
    </li>
  ));

  return (
    <div className="relative h-full">
      <button
        className="flex justify-between items-center bg-color-primary h-full px-[16px] w-[152px] text-nowrap font-bold rounded-lg cursor-pointer"
        onClick={toggleDropDown}
      >
        <span>{selectedItem}</span>
        <span>
          <img src="icons/arrow-drop-down-white.svg" alt="" />
        </span>
      </button>
      <div
        className={`absolute top-[102%] bg-color-primary rounded-lg overflow-hidden ${
          isOpen ? 'h-fit' : 'h-0'
        }`}
      >
        <ul className="py-[16px] h-full w-full">{renderItems}</ul>
      </div>
    </div>
  );
}
