import { IconProps } from '../icons/Icon';

interface Props {
  Icon: React.ComponentType<IconProps>;
  value: string;
  valueColor?: string;
}

export function InfoItem({ Icon, value, valueColor }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Icon width="24px" height="24px" />
      <span
        style={{
          color: valueColor,
        }}
      >
        {value}
      </span>
    </div>
  );
}
