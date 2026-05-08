interface Props {
  valueTextColor?: string;
  field: string;
  value: string;
  gap?: string;
}

export function FieldValue({ valueTextColor, field, value, gap = '8px' }: Props) {
  return (
    <span
      style={{
        display: 'flex',
        gap,
      }}
    >
      <p className="font-bold">{field}</p>
      <p
        className="break-all"
        style={{
          color: valueTextColor,
        }}
      >
        {value}
      </p>
    </span>
  );
}
