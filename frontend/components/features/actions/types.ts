import { IconProps } from '@/components/icons/Icon';

export interface CardAction {
  Icon: React.ComponentType<IconProps>;
  label: string;
  action: () => void;
};
