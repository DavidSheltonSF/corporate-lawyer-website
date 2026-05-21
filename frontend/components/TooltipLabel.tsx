import { PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export function TooltipLabel({ children, className }: PropsWithChildren<Props>) {
  const baseStyles =
    'absolute top-[-100%] left-1/2 -translate-x-1/2 hidden z-9999 group-hover:block fade-in-animation w-max p-[4px] rounded-md';

  return <span className={twMerge(baseStyles, className)}>{children}</span>;
}
