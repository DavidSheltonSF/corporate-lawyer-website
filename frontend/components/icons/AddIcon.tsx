import { Icon, IconProps } from './Icon';

export function AddIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </Icon>
  );
}
