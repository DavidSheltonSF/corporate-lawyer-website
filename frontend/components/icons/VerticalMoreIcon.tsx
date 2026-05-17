import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Icon } from './Icon';

export function VerticalMoreIcon(props: PropsWithClassName) {
  return (
    <Icon {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </Icon>
  );
}
