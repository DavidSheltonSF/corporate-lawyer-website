import { PropsWithClassName } from '@/types/PropsWithClassName';
import { twMerge } from 'tailwind-merge';

interface Props {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}

export function Input(props: PropsWithClassName<Props>) {
  const { className } = props;

  const baseStyles = 'border p-[8px] w-full rounded-sm p';
  return <input className={twMerge(baseStyles, className)} {...props} />;
}
