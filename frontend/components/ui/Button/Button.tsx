'use client';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonVariant } from './ButtonVariant';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button(props: ButtonProps) {
  const { children, className, variant = ButtonVariant.DEFAULT, ...buttonProps } = props;

  const baseStyles = 'rounded-sm font-bold py-[8px] px-[16px] duration-300 cursor-pointer';

  const variants: Record<ButtonVariant, string> = {
    DANGER: 'bg-color-red text-color-white hover:brightness-120',
    PRIMARY: 'bg-color-primary-light text-color-white hover:brightness-120',
    SECONDARY:
      'border text-color-primary-light hover:shadow-[var(--inner-shadow-primary-soft)] transition-[box-shadow] transition-[background] hover:bg-[var(--color-primary-light)]/10',
    DEFAULT: 'transition-[filter] hover:brightness-120 ',
    DISABLED: 'cursor-default bg-gray-400 text-gray/50',
  };

  return (
    <button {...buttonProps} className={twMerge(`${baseStyles} ${variants[variant]}`, className)}>
      {children}
    </button>
  );
}
