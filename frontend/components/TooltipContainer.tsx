import { ReactNode } from 'react';
import { TooltipLabelProps, TooltipLabel } from './TooltipLabel';

interface Props {
  label: string;
  tooltipLabelProps: TooltipLabelProps;
  additionalStyle?: string;
  children: ReactNode;
}
export function TooltipContainer({ label, tooltipLabelProps, additionalStyle, children }: Props) {
  return (
    <div className={`relative group w-fit h-fit ${additionalStyle}`}>
      {children}
      <TooltipLabel tooltipLabelProps={tooltipLabelProps}>{label}</TooltipLabel>
    </div>
  );
}
