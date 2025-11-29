interface Props {
  name: number | string;
  value: any;
}

export function DashboardCardInfo({ name, value }: Props) {
  return (
    <span className="flex justify-between text-lg">
      <p className="font-bold">{name}</p>
      <p>{value}</p>
    </span>
  );
}
