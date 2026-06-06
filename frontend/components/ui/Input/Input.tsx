import { PropsWithClassName } from '@/types/PropsWithClassName';
import { twMerge } from 'tailwind-merge';
import { InputProps } from './types';

interface Props {
  ref?: any
}

export function Input(props: PropsWithClassName<Props & InputProps>) {
  const { className, ...inputProps } = props;

  const baseStyles = 'border border-black p-[8px] w-full rounded-sm';
  return <input className={twMerge(baseStyles, className)} {...inputProps} />;
}
