'use client';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  size?: string;
  paddingX?: string;
  paddingY?: string;
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  darkHover?: boolean; // decrease brightness on hover
  border?: string;
}

export function Button(props: Props) {
  const {
    type,
    backgroundColor = 'inherit',
    textColor = 'var(--black-color)',
    fontSize = '1.2rem',
    children,
    size,
    width = size ? size : '128px',
    height = size ? size : '56px',
    paddingX = 'auto',
    paddingY = 'auto',
    onclick,
    disabled,
    darkHover,
    border,
  } = props;

  const baseStyles = 'w-full rounded-sm  px-[8px]';
  const activeStyles = 'transition-[filter] duration-300 cursor-pointer';
  const disabledStyles = 'cursor-default';
  const hoverStyles = darkHover ? 'hover:brightness-90' : 'hover:brightness-120';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : activeStyles} ${hoverStyles}`}
      style={{
        backgroundColor,
        color: textColor,
        fontSize,
        height,
        width,
        paddingInline: paddingX,
        paddingBlock: paddingY,
        border,
      }}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
