import { useEffect, useRef, useState } from 'react';
import { ArrowDropUpIcon } from '../../icons/ArrowDropUpIcon';
import { Input } from './Input';
import { InputProps } from './types';
import { DropdownInput } from './DropdownInput';

interface Props {
  label: string;
  itemLabel: Record<string, string>;
}

export function DropdownInputWithLabel({
  id,
  label,
  itemLabel,
  defaultValue,
  ...inputProps
}: Props & InputProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <DropdownInput id={id} itemLabel={itemLabel} {...inputProps} />
    </div>
  );
}
