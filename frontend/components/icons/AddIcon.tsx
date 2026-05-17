import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Icon } from './Icon';

export function AddIcon(props: PropsWithClassName) {
  return (
    <Icon {...props} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </Icon>
  );
}

