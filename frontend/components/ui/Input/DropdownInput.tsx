import { useEffect, useRef, useState } from 'react';
import { ArrowDropUpIcon } from '../../icons/ArrowDropUpIcon';
import { Input } from './Input';
import { InputProps } from './types';

interface Props {
  setSelectedValue: (value: string) => void;
  itemLabel: Record<string, string>;
}

export function DropdownInput({
  itemLabel,
  value,
  setSelectedValue,
  ...inputProps
}: Props & InputProps) {
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
  }, [value]);

  const items = Object.entries(itemLabel);
  const renderItems = items.map(([key, label]) => {
    return (
      <li
        onClick={() => {
          setSelectedValue(key);
          setListIsOpen(false);
        }}
        className="bg-white hover:brightness-80 cursor-pointer px-[8px] h-[32px]"
        key={key}
      >
        {label}
      </li>
    );
  });

  return (
    <div className="w-full">
      <div ref={dropRef} className="flex flex-col relative">
        <div
          className="flex jusfity-center items-center border h-fit w-full rounded-sm "
          onClick={() => setListIsOpen(true)}
        >
          <Input
            className="w-full  border-none"
            type="text"
            value={itemLabel[value || ''] ?? ''}
            readOnly
            {...inputProps}
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
            listIsOpen && 'py-[8px] overflow-y-auto shadow-soft'
          }`}
          style={{
            maxHeight: listIsOpen ? 5 * 32 : 0,
          }}
        >
          <ul>
            <li
              onClick={() => {
                setSelectedValue('');
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
