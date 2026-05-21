'use client';
import { IconProps } from '@/components/icons/types';
import { ReactEventHandler } from 'react';
import { Button } from '../Button/Button';

interface Props {
  Icon: React.ComponentType<IconProps>;
  inert?: boolean;
  onClickHandler: ReactEventHandler;
}

export function CarouselButton({ onClickHandler, inert, Icon }: Props) {
  return (
    <Button
      inert={inert}
      className={`rounded-md hidden md:block border border-color-primary-light  hover:bg-[var(--color-white)] transition-[background-color] duration-300  inert:opacity-50 inert:saturate-0 size-[56px] md:size-[80px]`}
      onClick={onClickHandler}
    >
      <Icon className="stroke-[var(--color-primary-light)]" />
    </Button>
  );
}
