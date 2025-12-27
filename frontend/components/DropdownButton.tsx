'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CaseSearchEnum } from '../types/CaseSearchEnum';

interface Props {
  listItems: any[];
  defaultValue?: string;
  darkTheme?: boolean;
  selectedItem: string | null;
  setSelectedItem: Dispatch<SetStateAction<any>>;
}
export function DropDownButton({
  listItems,
  defaultValue,
  darkTheme,
  selectedItem,
  setSelectedItem,
}: Props) {
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

  function selectItem(item: CaseSearchEnum) {
    setSelectedItem(item);
    setIsOpen(false);
  }

  const renderItems = listItems.map((item, index) => (
    <li key={index}>
      <button
        className={`text-start w-full bg-inherit cursor-pointer px-[16px] py-[4px] ${
          darkTheme
            ? 'text-color-white bg-color-primary hover:brightness-120'
            : 'text-color-black bg-color-white hover:brightness-80'
        }`}
        onClick={() => {
          selectItem(item);
        }}
      >
        {item}
      </button>
    </li>
  ));

  return (
    <div
      ref={menuRef}
      className={`relative h-full`}
      style={{
        borderRadius: 'inherit',
      }}
    >
      <button
        className={`flex justify-between items-center size-full px-[16px] text-nowrap font-bold cursor-pointer   ${
          darkTheme ? 'text-color-white bg-color-primary' : 'text-color-black bg-color-white'
        }`}
        onClick={toggleDropDown}
        style={{
          borderRadius: 'inherit',
        }}
      >
        <span className="flex-1 text-start">{selectedItem || defaultValue}</span>
        <span>
          <img
            className={`${!darkTheme ? 'invert' : ''}`}
            src="icons/arrow-drop-down-white.svg"
            alt=""
          />
        </span>
      </button>
      <div
        className={`absolute z-90 border-black top-[102%] w-full rounded-lg overflow-hidden ${
          isOpen ? 'h-fit border' : 'h-0'
        }  ${darkTheme ? 'text-color-white bg-color-primary' : 'text-color-black bg-color-white'}`}
      >
        <ul className="py-[8px] h-full w-full">{renderItems}</ul>
      </div>
    </div>
  );
}
