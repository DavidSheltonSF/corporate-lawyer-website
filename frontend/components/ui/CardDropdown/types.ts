import { PropsWithClassName } from '../../../types/PropsWithClassName';

export interface MenuItem {
  Icon: React.ComponentType<PropsWithClassName>;
  label: string;
  visible: boolean;
  action: () => void;
}
