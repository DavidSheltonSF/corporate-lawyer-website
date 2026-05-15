import { WithChildren } from '@/types/WithChildren';

export interface IconProps {
  className: string;
}

export function Icon({ className, children }: WithChildren<IconProps>) {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="size-full"
        height="size-full"
        viewBox="0 -960 960 960"
        fill="inherit"
      >
        {children}
      </svg>
    </span>
  );
}
