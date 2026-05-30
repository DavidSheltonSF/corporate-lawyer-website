import { InputProps } from './types';
import { DropdownInput } from './DropdownInput';

interface Props {
  label: string;
  itemLabel: Record<string, string>;
  onSelectValue?: (value: string) => void;
}

export function DropdownInputWithLabel({
  id,
  label,
  itemLabel,
  defaultValue,
  onSelectValue,
  ...inputProps
}: Props & InputProps) {
  return (
    <div className="w-full">
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <DropdownInput id={id} itemLabel={itemLabel} onSelectValue={onSelectValue} {...inputProps} />
    </div>
  );
}
