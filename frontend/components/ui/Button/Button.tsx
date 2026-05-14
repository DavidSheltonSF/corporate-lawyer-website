'use client';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export function Button(props: Props) {
  const { type, children, onclick, disabled, className } = props;

  const baseStyles = 'w-full rounded-sm  px-[8px]';
  const activeStyles = 'transition-[filter] duration-300 cursor-pointer';
  const disabledStyles = 'cursor-default';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : activeStyles} ${className}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
