import { useEffect, useRef, useState } from 'react';
import { ArrowDropUpIcon } from '../../icons/ArrowDropUpIcon';
import { Input } from './Input';
import { InputProps } from './types';

interface Props {
  itemLabel: Record<string, string>;
  value?: string;
  onSelectValue?: (value: string) => void;
}

export function DropdownInput({
  value,
  itemLabel,
  defaultValue,
  onSelectValue,
  ...inputProps
}: Props & InputProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value || '');
  const [listIsOpen, setListIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    onSelectValue && onSelectValue(selectedValue);
    if (inputRef.current) {
      inputRef.current.value = selectedValue;
    }
  }, [selectedValue]);

  const items = Object.values(itemLabel);
  const renderItems = items.map((item, index) => {
    return (
      <li
        onClick={() => {
          setSelectedValue(item);
          setListIsOpen(false);
        }}
        className="bg-white hover:brightness-80 cursor-pointer px-[8px] h-[32px]"
        key={index}
      >
        {item}
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
            ref={inputRef}
            className="w-full  border-none"
            type="text"
            value={value}
            onChange={(e) => setSelectedValue(e.target.value)}
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
            listIsOpen && 'border py-[8px]'
          }`}
          style={{
            height: listIsOpen ? (items.length + 1) * 32 : 0,
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
