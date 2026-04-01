import { useEffect, useRef, useState } from 'react';
import { ArrowDropUp } from '../icons/ArrowDropUp';

interface Props {
  id: string;
  name: string;
  label: string;
  items: string[];
  itemLabel: Function;
}

export function DropdownInputWithLabel({ id, name, label, items, itemLabel }: Props) {
  const [selectedValue, setSelectedValue] = useState(0);
  const [listIsOpen, setListIsOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setListIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const renderItems = items.map((item, index) => {
    return (
      <li
        onClick={() => {
          setSelectedValue(index);
          setListIsOpen(false);
        }}
        className="bg-white hover:brightness-80 cursor-pointer px-[8px]"
        key={index}
      >
        {itemLabel(item)}
      </li>
    );
  });

  return (
    <div className="w-full">
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <div ref={dropRef} className="flex flex-col relative">
        <div className="flex jusfity-center items-center border h-[40px] w-full rounded-sm px-[8px]">
          <input
            onClick={() => setListIsOpen(true)}
            id={id}
            name={name}
            className="w-full h-full"
            type="text"
            value={itemLabel(items[selectedValue])}
            readOnly
          />
          <span className={`transition-[rotate] duration-300 ${!listIsOpen && 'rotate-180'}`}>
            <ArrowDropUp height="24px" width="24px" />
          </span>
        </div>
        <div
          className={`transition-[height] duration-300 absolute z-1 w-full bg-white overflow-hidden w-full top-[100%]  ${
            listIsOpen && 'border py-[8px]'
          }`}
          style={{
            height: listIsOpen ? items.length * 36 : 0,
          }}
        >
          <ul>{renderItems}</ul>
        </div>
      </div>
    </div>
  );
}
