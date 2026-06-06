import { useEffect, useRef, useState } from 'react';
import { ArrowDropUpIcon } from '../../icons/ArrowDropUpIcon';
import { Input } from './Input';
import { InputProps } from './types';
import { useFloating, size, offset, autoUpdate } from '@floating-ui/react';

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
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

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
    <div ref={dropRef}>
      <div
        ref={refs.setReference}
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
        ref={refs.setFloating}
        className={`transition-[max-height] transition-[padding] duration-300 bg-white overflow-hidden rounded-sm ${
          listIsOpen && 'overflow-y-auto shadow-soft py-[8px] z-10'
        }`}
        style={{
          maxHeight: listIsOpen ? 5 * 32 : 0,
          ...floatingStyles,
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
  );
}
