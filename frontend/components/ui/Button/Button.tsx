'use client';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button(props: ButtonProps) {
  const { children, disabled, className, variant, ...buttonProps } = props;

  const baseStyles = 'rounded-sm font-bold py-[8px] px-[16px] duration-300 cursor-pointer';
  const disabledStyles = 'cursor-default bg-gray/50 text-gray/50';

  const variants: Record<string, string> = {
    primary: 'bg-color-primary-light text-color-white hover:brightness-120',
    secondary:
      'border text-color-primary-light hover:shadow-[var(--inner-shadow-primary-soft)] transition-[box-shadow] transition-[background] hover:bg-[var(--color-primary-light)]/10',
    generic: 'transition-[filter] hover:brightness-120 ',
  };

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={twMerge(
        `${baseStyles} ${disabled ? disabledStyles : variants[variant || 'generic']}`,
        className
      )}
    >
      {children}
    </button>
  );
}
