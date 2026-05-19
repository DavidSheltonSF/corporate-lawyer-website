import { PropsWithClassName } from '../../../types/PropsWithClassName';

export interface CardAction {
  Icon: React.ComponentType<PropsWithClassName>;
  label: string;
  action: () => void;
}
