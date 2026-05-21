import { ReactNode } from 'react';
import { TooltipLabel } from './TooltipLabel';

interface Props {
  label: string;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
}
export function TooltipContainer({ label, labelClassName, children }: Props) {
  return (
    <div className={'relative group w-fit h-fit'}>
      {children}
      <TooltipLabel className={labelClassName}>{label}</TooltipLabel>
    </div>
  );
}
