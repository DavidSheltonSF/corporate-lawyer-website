import { Input } from './Input';
import { InputProps } from './types';

interface Props {
  label: string;
}

export function InputWithLabel({ id, label, ...inputProps }: Props & InputProps) {
  return (
    <div className="w-full">
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
