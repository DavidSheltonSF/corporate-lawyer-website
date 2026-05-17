interface Props {
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export function SearchInput({ value, placeholder, onChange, onKeyDown }: Props) {
  return (
    <input
      name="caseSearchBar"
      className="flex flex-1 size-full placeholder:text-black/65 text-black"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
