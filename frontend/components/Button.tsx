'use client';

interface Props {
  backgroundColor?: string;
  textColor?: string;
  paddingX?: string;
  paddingY?: string;
  children: React.ReactNode;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button(props: Props) {
  const {
    backgroundColor = 'var(--white-color)',
    textColor = 'var(--black-color)',
    children,
    paddingX = '16px',
    paddingY = '4px',
    onclick,
    disabled,
  } = props;
  return (
    <button
      disabled={disabled}
      className="rounded-sm hover:brightness-120 cursor-pointer"
      style={{
        backgroundColor,
        color: textColor,
        paddingInline: paddingX,
        paddingBlock: paddingY,
      }}
      onClick={onclick}
    >
      {children}
    </button>
  );
}
