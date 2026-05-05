import { WithChildren } from '@/types/WithChildren';

export interface IconProps {
  height: string;
  width: string;
  color?: string;
}

export function Icon(props: WithChildren<IconProps>) {
  const { height = '56px', width = '56px', color = 'black', children } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={color}
    >
      {children}
    </svg>
  );
}
