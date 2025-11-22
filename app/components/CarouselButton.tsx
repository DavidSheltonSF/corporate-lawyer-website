import { ReactEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  inert?: boolean;
  onClickHandler: ReactEventHandler
}

export function CarouselButton({ onClickHandler, inert, children }: Props) {
  return (
    <button
      inert={inert}
      className={`flex items-center justify-center rounded-md size-[80px] border border-color-secondary bg-black/50 hover:bg-white transition-[background-color] duration-300  cursor-pointer inert:opacity-50 inert:saturate-0`}
      onClick={onClickHandler}
    >
      <div>{children}</div>
    </button>
  );
}
