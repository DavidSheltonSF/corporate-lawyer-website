import { ChangeEventHandler, MouseEventHandler } from 'react';

export interface InputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
  readOnly?: boolean;
  defaultValue?: string;
  min?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
}
