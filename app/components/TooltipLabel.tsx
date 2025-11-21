import { ReactNode } from 'react';

export interface TooltipLabelProps {
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
  position?: 'top' | 'middle' | 'bottom';
}

interface Props {
  tooltipLabelProps: TooltipLabelProps;
  children: ReactNode;
}

export function TooltipLabel({ tooltipLabelProps, children }: Props) {
  const { color, fontSize, backgroundColor, position } = tooltipLabelProps;

  let positionConfig = '';

  switch (position) {
    case 'top':
      positionConfig = 'bottom-[120%] left-[50%] translate-x-[-50%]';
      break;

    case 'middle':
      positionConfig = 'top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]';
      break;

    case 'bottom':
      positionConfig = 'top-[120%] left-[50%] translate-x-[-50%]';
      break;

    default:
      positionConfig = 'bottom-[120%] left-[50%] translate-x-[-50%]';
      break;
  }

  return (
    <span
      className={`absolute hidden z-9999 group-hover:block appear-animation-fast w-max p-[4px] rounded-md ${positionConfig}`}
      style={{
        color,
        fontSize,
        backgroundColor,
      }}
    >
      {children}
    </span>
  );
}
