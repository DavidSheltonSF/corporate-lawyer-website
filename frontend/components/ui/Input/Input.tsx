import { PropsWithClassName } from '@/types/PropsWithClassName';
import { twMerge } from 'tailwind-merge';
import { InputProps } from './types';

export function Input(props: PropsWithClassName<InputProps>) {
  const { className } = props;

  const baseStyles = 'border p-[8px] w-full rounded-sm p';
  return <input className={twMerge(baseStyles, className)} {...props} />;
}
