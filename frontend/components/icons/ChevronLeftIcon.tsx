import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Icon } from './Icon';

export function ChevronLeftIcon(props: PropsWithClassName) {
  return (
    <Icon {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </Icon>
  );
}
