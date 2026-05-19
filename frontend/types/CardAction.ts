import { PropsWithClassName } from './PropsWithClassName';

export interface CardAction {
  Icon: React.ComponentType<PropsWithClassName>;
  label: string;
  action: () => void;
}
