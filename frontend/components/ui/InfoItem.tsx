import { IconProps } from '../icons/types';
import { Text } from './Text';

interface Props {
  Icon: React.ComponentType<IconProps>;
  value: string;
  valueColor?: string;
}

export function InfoItem({ Icon, value, valueColor }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-[24px]" />
      <span
        style={{
          color: valueColor,
        }}
      >
        <Text>{value}</Text>
      </span>
    </div>
  );
}
