import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Icon } from './Icon';

export function CloseIcon(props: PropsWithClassName) {
  return (
    <Icon {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </Icon>
  );
}
