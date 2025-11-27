import { Activity } from 'react';

interface Props {
  id: string;
  name: string;
  label?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  iconPath?: string;
  required?: boolean;
}

export function InputForm({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  iconPath,
  required,
}: Props) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <Activity mode={label !== undefined ? 'visible' : 'hidden'}>
        <label className="" htmlFor={id}>
          {label}
        </label>
      </Activity>
      <span className="flex w-full gap-[8px] border-b-[2px] border-color-primary-light">
        <Activity mode={iconPath !== undefined ? 'visible' : 'hidden'}>
          <img className="size-[32px]" src={iconPath} alt="" />
        </Activity>
        <input
          id={id}
          name={name}
          className="w-full placeholder:text-[var(--primary-color-light)]"
        type={type}
          placeholder={placeholder}
          required={required}
        />
      </span>
    </div>
  );
}
