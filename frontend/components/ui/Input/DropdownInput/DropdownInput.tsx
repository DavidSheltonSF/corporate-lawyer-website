import { useEffect, useRef, useState } from 'react';
import { ArrowDropUpIcon } from '../../../icons/ArrowDropUpIcon';
import { Input } from '../Input';
import { InputProps } from '../types';
import { useFloating, size, offset, autoUpdate } from '@floating-ui/react';
import { DropdownInputMenu } from './DropdownInputMenu';
import { Button } from '../../Button/Button';

interface Props {
  setSelectedValue: (value: string) => void;
  itemLabel: Record<string, string>;
}

DropdownInput.Menu = DropdownInputMenu;

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

  function closeDropdown() {
    setListIsOpen(false);
  }

  function selectValue(value: string) {
    setSelectedValue(value);
  }

  return (
    <div ref={dropRef}>
      <div
        ref={refs.setReference}
        className="flex jusfity-center items-center border h-fit w-full rounded-sm pr-[8px]"
      >
        <Input
          onClick={() => setListIsOpen(true)}
          className="w-full border-none"
          type="text"
          value={itemLabel[value || ''] ?? ''}
          readOnly
          {...inputProps}
        />

        <Button
          type="button"
          className="flex items-center justify-center size-[32px] bg-color-white brightness-95 hover:brightness-90"
          onClick={() => setListIsOpen(!listIsOpen)}
        >
          <span className={`transition-[rotate] duration-300 ${!listIsOpen && 'rotate-180'}`}>
            <ArrowDropUpIcon className="size-[24px]" />
          </span>
        </Button>
      </div>
      <DropdownInput.Menu
        ref={refs.setFloating}
        items={Object.entries(itemLabel)}
        selectValue={selectValue}
        closeDropdown={closeDropdown}
        isOpen={listIsOpen}
        floatingStyles={floatingStyles}
      />
    </div>
  );
}
