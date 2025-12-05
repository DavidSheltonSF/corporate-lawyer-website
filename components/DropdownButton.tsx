'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CaseQueryTypeEnum } from './CaseQueryTypeEnum';

interface Props {
  listItems: CaseQueryTypeEnum[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<CaseQueryTypeEnum>>;
}
export function DropDownButton({ listItems, selectedItem, setSelectedItem }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    //Clean up to remove the listener when the component is destroyed
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  function selectItem(item: CaseQueryTypeEnum) {
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
    <div ref={menuRef} className="relative h-full">
      <button
        className="flex justify-between items-center bg-color-primary h-full px-[16px] w-[152px] text-nowrap font-bold rounded-l-md cursor-pointer"
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
        <ul className="py-[8px] h-full w-full">{renderItems}</ul>
      </div>
    </div>
  );
}
