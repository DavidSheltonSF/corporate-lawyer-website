import { ReactNode } from 'react';

export interface TooltipLabelProps {
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    translateX?: string;
    translateY?: string;
  };
}

interface Props {
  tooltipLabelProps: TooltipLabelProps;
  children: ReactNode;
}

export function TooltipLabel({ tooltipLabelProps, children }: Props) {
  const { color, fontSize, backgroundColor, position } = tooltipLabelProps;

  return (
    <span
      className={`absolute hidden z-9999 group-hover:block fade-in-animation-fast w-max p-[4px] rounded-md`}
      style={{
        color,
        fontSize,
        backgroundColor,
        top: position?.top,
        bottom: position?.bottom,
        left: position?.left,
        right: position?.right,
        transform: `translate(${position?.translateX || 0}, ${position?.translateY || 0}`,
      }}
    >
      {children}
    </span>
  );
}
