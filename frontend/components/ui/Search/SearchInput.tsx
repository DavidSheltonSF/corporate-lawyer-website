interface Props {
  value: string
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput({ placeholder, value, onChange }: Props) {
  return (
    <input
      name="caseSearchBar"
      className="flex flex-1 size-full placeholder:text-black/65 text-black"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
