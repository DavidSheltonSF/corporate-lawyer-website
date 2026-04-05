'use client';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button(props: Props) {
  const {
    type,
    backgroundColor = 'var(--white-color)',
    textColor = 'var(--black-color)',
    fontSize = '1.2rem',
    children,
    width = '128px',
    height = '56px',
    onclick,
    disabled,
  } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-sm ${!disabled && 'cursor-pointer hover:brightness-120 '}`}
      style={{
        backgroundColor,
        color: textColor,
        fontSize,
        height,
        width,
      }}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
