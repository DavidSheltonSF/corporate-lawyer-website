import { useElementFullyVisible } from '@/hooks/modals/useElementFullyVisible';
import { CSSProperties } from 'react';

interface Props {
  reference: any;
  floatingReference: any;
  items: [string, string][];
  isOpen: boolean;
  closeDropdown: () => void;
  selectValue: (value: string) => void;
  floatingStyles: CSSProperties;
}

export function DropdownInputMenu({
  reference,
  floatingReference,
  items,
  isOpen,
  floatingStyles,
  closeDropdown,
  selectValue,
}: Props) {
  const { elementIsFullyVisible } = useElementFullyVisible(reference, { threshold: 1 });

  const renderItems = items.map(([key, label]) => {
    return (
      <li
        onClick={() => {
          selectValue(key);
          closeDropdown();
        }}
        className="bg-white hover:brightness-80 cursor-pointer px-[8px] h-[32px]"
        key={key}
      >
        {label}
      </li>
    );
  });

  return (
    elementIsFullyVisible && (
      <ul
        ref={floatingReference}
        className={`transition-[max-height] transition-[padding] duration-300 bg-white overflow-hidden rounded-sm ${
          isOpen && 'overflow-y-auto shadow-soft py-[8px] z-10'
        }`}
        style={{
          maxHeight: isOpen ? 5 * 32 : 0,
          ...floatingStyles,
        }}
      >
        <li
          onClick={() => {
            selectValue('');
            closeDropdown();
          }}
          className="bg-white hover:brightness-80 cursor-pointer px-[8px]"
        >
          ...
        </li>
        {renderItems}
      </ul>
    )
  );
}
