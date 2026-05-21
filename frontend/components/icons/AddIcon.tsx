import { Icon } from './Icon';
import { IconProps } from './types';

export function AddIcon(props: IconProps) {
  return (
    <Icon {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </Icon>
  );
}
