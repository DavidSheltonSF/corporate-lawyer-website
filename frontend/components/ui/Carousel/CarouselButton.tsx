'use client';
import { IconProps } from '@/components/icons/types';
import { ReactEventHandler, ReactNode } from 'react';

interface Props {
  Icon: React.ComponentType<IconProps>
  inert?: boolean;
  onClickHandler: ReactEventHandler;
}

export function CarouselButton({ onClickHandler, inert, Icon }: Props) {
  return (
    <button
      inert={inert}
      className={`rounded-md hidden md:block border border-color-primary-light bg-black/50 hover:bg-white transition-[background-color] duration-300 cursor-pointer inert:opacity-50 inert:saturate-0 size-[56px] md:size-[80px]`}
      onClick={onClickHandler}
    >
      <Icon/>
    </button>
  );
}
