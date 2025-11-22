import { ReactEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  inert?: boolean;
  onClickHandler: ReactEventHandler;
}

export function CarouselButton({ onClickHandler, inert, children }: Props) {
  return (
    <button
      inert={inert}
      className={`rounded-md hidden md:block border-color-secondary bg-black/50 hover:bg-white transition-[background-color] duration-300 cursor-pointer inert:opacity-50 inert:saturate-0 size-[56px] md:size-[80px]`}
      onClick={onClickHandler}
    >
      <div>{children}</div>
    </button>
  );
}
