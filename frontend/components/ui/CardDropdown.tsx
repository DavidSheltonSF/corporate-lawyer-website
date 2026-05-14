'use client';
import { IconProps } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  isOpen: boolean;
  close: Function;
  className?: string;
  options: { Icon: React.ComponentType<IconProps>; label: string; action: Function }[];
}

export function CardDropdown({ isOpen, close, className, options }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

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

  const renderItems = options.map((options, index) => {
    const { Icon, label, action } = options;
    return (
      <li key={index} className="w-full">
        <Button
          className="flex item-center gap-[8px] px-[16px] size-full py-[8px] bg-color-white hover:brightness-95"
          onclick={() => action()}
        >
          <Icon width="24px" height="24px" />
          <span>{label}</span>
        </Button>
      </li>
    );
  });

  const positionStyles = 'absolute top-[-8px] right-0 translate-x-[100%]';
  const sizeStyles = `w-[300px] h-fit`;
  const transitionStyles = 'transition-all duration-300 fade-in-animation';
  const baseStyles = `bg-red-200 py-[16px] rounded-[8px] text-color-black`;

  return (
    isDesktop && <div
      className={twMerge(positionStyles, sizeStyles, transitionStyles, baseStyles, className)}
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col">{renderItems}</ul>
    </div>
  );
}
