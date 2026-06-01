import { InputProps } from './types';
import { DropdownInput } from './DropdownInput';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  label: string;
  itemLabel: Record<string, string>;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function DropdownInputWithLabel({
  id,
  label,
  itemLabel,
  defaultValue,
  selectedValue,
  setSelectedValue,
  ...inputProps
}: Props & InputProps) {
  return (
    <div className="w-full">
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <DropdownInput
        id={id}
        itemLabel={itemLabel}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        {...inputProps}
      />
    </div>
  );
}
