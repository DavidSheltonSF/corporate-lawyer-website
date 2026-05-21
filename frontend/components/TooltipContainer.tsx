import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  label: string;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
}
export function TooltipContainer({ label, labelClassName, children }: Props) {
  const baseStyles =
    'absolute top-[-100%] left-1/2 -translate-x-1/2 hidden z-9999 group-hover:block fade-in-animation w-max p-[4px] rounded-md';

  return (
    <div className={'relative group w-fit h-fit'}>
      {children}
      <span className={twMerge(baseStyles, labelClassName)}>{label}</span>{' '}
    </div>
  );
}
