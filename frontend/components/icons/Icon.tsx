import { IconProps } from './types';

export function Icon(props: IconProps) {
  const { label, children } = props;
  return (
    <svg
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {label && <title>{label}</title>}
      {children}
    </svg>
  );
}
