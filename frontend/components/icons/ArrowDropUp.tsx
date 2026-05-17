import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Icon } from './Icon';

export function ArrowDropUp(props: PropsWithClassName) {
  return (
    <Icon {...props}   fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </Icon>
  );
}