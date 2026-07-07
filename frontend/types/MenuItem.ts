import { PropsWithClassName } from './PropsWithClassName';

export interface MenuItem {
  Icon: React.ComponentType<PropsWithClassName>;
  label: string;
  action: () => void;
}
