import { PropsWithClassName } from '@/types/PropsWithClassName';
import { twMerge } from 'tailwind-merge';
import { InputProps } from './types';
import { RefObject } from 'react';

interface Props {
  ref?: RefObject<HTMLInputElement | null>;
}

export function Input(props: PropsWithClassName<Props & InputProps>) {
  const { className, ...inputProps } = props;

  const baseStyles = 'border border-black p-[8px] w-full rounded-sm';
  return <input className={twMerge(baseStyles, className)} {...inputProps} />;
}
