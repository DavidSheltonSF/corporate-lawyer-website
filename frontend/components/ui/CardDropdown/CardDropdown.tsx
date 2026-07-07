'use client';
import { Button } from '@/components/ui/Button/Button';
import { MenuItem } from '@/types/MenuItem';
import { useElementFullyVisible } from '@/hooks/modals/useElementFullyVisible';
import { CSSProperties, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  reference?: any;
  floatingReference: any;
  floatingStyles: CSSProperties;
  close: Function;
  className?: string;
  actions: MenuItem[];
}

export function CardDropdown({
  reference,
  floatingReference,
  floatingStyles,
  close,
  className,
  actions,
}: Props) {
  const { elementIsFullyVisible } = useElementFullyVisible(reference, { threshold: 1 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current?.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  const renderItems = actions.map((actions, index) => {
    const { Icon, label, action } = actions;
    return (
      <li key={index} className="w-full">
        <Button
          className="flex item-center gap-[8px] px-[16px] size-full py-[8px] bg-color-white hover:brightness-95"
          onClick={() => {
            action();
            close();
          }}
        >
          <Icon className="size-[24px]" />
          <span>{label}</span>
        </Button>
      </li>
    );
  });

  const sizeStyles = `w-[70%] min-lg:w-[300px] h-fit z-[99999]`;
  const transitionStyles = 'fade-in-animation-fast';
  const baseStyles = `bg-color-white py-[8px] rounded-[8px] text-color-black shadow-soft`;

  return (
    elementIsFullyVisible && (
      <div
        className={twMerge(sizeStyles, transitionStyles, baseStyles, className)}
        style={{ ...floatingStyles }}
        ref={floatingReference}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={dropdownRef}>
          <ul className="flex flex-col">{renderItems}</ul>
        </div>
      </div>
    )
  );
}
