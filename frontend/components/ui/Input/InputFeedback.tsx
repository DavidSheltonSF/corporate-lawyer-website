interface Props {
  label: string;
}

export function InputFeedback({ label }: Props) {
  return <span className="text-color-red font-bold">{label}</span>;
}
