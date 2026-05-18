'use client';
import { Button } from '@/components/ui/Button/Button';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  close: Function;
  className?: string;
  actions: {
    Icon: React.ComponentType<PropsWithClassName>;
    label: string;
    action: Function;
  }[];
}

export function CardDropdown({ close, className, actions }: Props) {
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

  const positionStyles =
    'z-60 absolute top-[10px] min-lg:top-[-8px] right-1/2  min-lg:right-0 translate-x-1/2 min-lg:translate-x-[100%]';
  const sizeStyles = `w-[70%] min-lg:w-[300px] h-fit`;
  const transitionStyles = 'fade-in-animation-fast';
  const baseStyles = `bg-color-white py-[8px] rounded-[8px] text-color-black shadow-soft`;

  return (
    <div
      className={twMerge(positionStyles, sizeStyles, transitionStyles, baseStyles, className)}
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col">{renderItems}</ul>
    </div>
  );
}
