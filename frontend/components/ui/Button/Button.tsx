'use client';
import { twMerge } from "tailwind-merge";

interface Props {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export function Button(props: Props) {
  const { type, children, onclick, disabled, className } = props;

  const baseStyles = 'rounded-sm';
  const activeStyles = 'transition-[filter] duration-300 cursor-pointer';
  const disabledStyles = 'cursor-default';

  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(`${baseStyles} ${disabled ? disabledStyles : activeStyles}`, className)}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
