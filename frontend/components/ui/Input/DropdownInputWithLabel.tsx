import { useEffect, useRef, useState } from 'react';
import { ArrowDropUpIcon } from '../../icons/ArrowDropUpIcon';
import { Input } from './Input';

interface Props<T> {
  id: string;
  name: string;
  label: string;
  defaultValue?: T[keyof T];
  itemsRecord: T;
  itemLabel: Function;
}

export function DropdownInputWithLabel<T extends Record<string, string>>({
  id,
  name,
  label,
  itemsRecord,
  itemLabel,
  defaultValue,
}: Props<T>) {
  const [selectedValue, setSelectedValue] = useState<T[keyof T] | null>(null);
  const [listIsOpen, setListIsOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setListIsOpen(false);
      }
    }

    if (defaultValue) {
      setSelectedValue(defaultValue);
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [defaultValue]);

  const items = Object.values(itemsRecord);
  const renderItems = items.map((item, index) => {
    return (
      <li
        onClick={() => {
          setSelectedValue(item as T[keyof T]);
          setListIsOpen(false);
        }}
        className="bg-white hover:brightness-80 cursor-pointer px-[8px] h-[32px]"
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
        <div
          className="flex jusfity-center items-center border h-fit w-full rounded-sm "
          onClick={() => setListIsOpen(true)}
        >
          <Input
            id={id}
            name={name}
            className="w-full  border-none"
            type="text"
            value={selectedValue !== null ? itemLabel(itemsRecord[selectedValue]) : '...'}
            readOnly
          />

          <button
            type="button"
            className="flex items-center justify-center rounded-md size-[32px] bg-white hover:brightness-90 cursor-pointer"
            onClick={() => setListIsOpen(!listIsOpen)}
          >
            <span className={`transition-[rotate] duration-300 ${!listIsOpen && 'rotate-180'}`}>
              <ArrowDropUpIcon className="size-[24px]" />
            </span>
          </button>
        </div>
        <div
          className={`transition-[height] duration-300 absolute z-1 w-full bg-white overflow-hidden w-full top-[100%]  ${
            listIsOpen && 'border py-[8px]'
          }`}
          style={{
            height: listIsOpen ? (items.length + 1) * 32 : 0,
          }}
        >
          <ul>
            <li
              onClick={() => {
                setSelectedValue(null);
                setListIsOpen(false);
              }}
              className="bg-white hover:brightness-80 cursor-pointer px-[8px]"
            >
              ...
            </li>
            {renderItems}
          </ul>
        </div>
      </div>
    </div>
  );
}
