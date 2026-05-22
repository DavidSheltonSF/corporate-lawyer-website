import { PropsWithClassName } from '../../../types/PropsWithClassName';

export enum CardActionType {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  CHECK_DEADLINES = 'CHECK_DEADLINES',
  CHECK_FILES = 'CHECK_FILES',
}

export interface CardAction {
  Icon: React.ComponentType<PropsWithClassName>;
  label: string;
  action: () => void;
}
