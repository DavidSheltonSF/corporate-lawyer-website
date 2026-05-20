import { Input } from "./Input";

interface Props {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
}

export function InputWithLabel({ id, name, label, defaultValue }: Props) {
  return (
    <div className="w-full">
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type="text"
        defaultValue={defaultValue}
      />
    </div>
  );
}
