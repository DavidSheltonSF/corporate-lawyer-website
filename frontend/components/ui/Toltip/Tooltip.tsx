import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  label: string;
  labelClassName?: string;
  children: ReactNode;
}
export function Tooltip({ label, labelClassName, children }: Props) {
  const baseStyles =
    'absolute top-[-120%] py-[4px] px-[8px] shadow-soft left-1/2 -translate-x-1/2 hidden z-20 group-hover:block fade-in-animation w-max p-[4px] rounded-md bg-color-white';

  return (
    <div className={'relative group w-fit h-fit'}>
      {children}
      <span className={twMerge(baseStyles, labelClassName)}>{label}</span>
    </div>
  );
}
