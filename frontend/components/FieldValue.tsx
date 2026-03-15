interface Props {
  field:  string;
  value: string;
  gap?: string;
}

export function FieldValue({ field, value, gap="8px" }: Props) {
  return (
    <span
      style={{
        display: 'flex',
        gap,
      }}
    >
      <p className="font-bold">{field}</p>
      <p className="break-all">{value}</p>
    </span>
  );
}
