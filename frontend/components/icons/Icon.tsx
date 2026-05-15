import { WithChildren } from '@/types/WithChildren';

export interface IconProps {
  className: string;
}

export function Icon({ className, children }: WithChildren<IconProps>) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      {children}
    </svg>
  );
}
