interface Props {
  id: string;
  name: string;
  label: string;
}

export function InputWithLabel({ id, name, label }: Props) {
  return (
    <div>
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="border h-[40px] w-full rounded-sm px-[8px]"
        type="text"
      />
    </div>
  );
}
