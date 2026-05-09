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
      className="w-full h-full placeholder:text-black/65 text-black pl-[14px]"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
