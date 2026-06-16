import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { autoUpdate, FloatingPortal, offset, size, useFloating } from '@floating-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';

interface Props {
  label: string;
  selectedValue: string | null;
  setSelectedValue: (value: string) => void;
  itemLabel?: Record<string, string>;
}

export function SearchFilter({ selectedValue, label, itemLabel, setSelectedValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { floatingStyles, refs } = useFloating({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            width: 'fit-content',
          });
        },
      }),
    ],
  });
  const dropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={dropRef}>
      <div
        ref={refs.setReference}
        onClick={() => setIsOpen(true)}
        className="flex justify-between gap-[16px] h-fit w-fit cursor-pointer p-[16px] py-[8px] bg-color-white text-color-black rounded-full"
      >
        <span>{selectedValue && itemLabel ? itemLabel[selectedValue] : label}</span>
        {!selectedValue ? (
          <ChevronDownIcon
            className={`size-[24px] transition-[all] duration-300 ${isOpen && 'rotate-180'}`}
          />
        ) : (
          <Button
            className="p-0 bg-color-white hover:brightness-95"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedValue('');
            }}
          >
            <CloseIcon className="size-[24px]" />
          </Button>
        )}
      </div>

      <FloatingPortal>
        <span ref={refs.setFloating} style={floatingStyles}>
          <Dropdown
            itemLabel={itemLabel || {}}
            selectItem={(value) => setSelectedValue?.(value)}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </span>
      </FloatingPortal>
    </div>
  );
}
