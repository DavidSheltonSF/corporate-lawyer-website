'use client';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  paddingX?: string;
  paddingY?: string;
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button(props: Props) {
  const {
    type,
    backgroundColor = 'var(--white-color)',
    textColor = 'var(--black-color)',
    fontSize,
    children,
    paddingX = '16px',
    paddingY = '8px',
    onclick,
    disabled,
  } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full rounded-sm hover:brightness-120 cursor-pointer"
      style={{
        backgroundColor,
        color: textColor,
        fontSize,
        paddingInline: paddingX,
        paddingBlock: paddingY,
      }}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
