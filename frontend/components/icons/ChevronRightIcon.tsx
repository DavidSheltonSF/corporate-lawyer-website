import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Icon } from './Icon';

export function ChevronRightIcon(props: PropsWithClassName) {
  return (
    <Icon {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </Icon>
  );
}
