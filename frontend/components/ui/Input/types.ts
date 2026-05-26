export interface InputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: () => void;
}
