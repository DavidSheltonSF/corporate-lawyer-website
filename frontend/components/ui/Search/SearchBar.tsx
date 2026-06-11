import { KeyboardEvent, ChangeEventHandler } from 'react';
import { SearchInput } from './SearchInput';
import { SearchIcon } from '@/components/icons/SearchIcon';

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

SearchBar.Input = SearchInput;

export function SearchBar({ onChange, value }: Props) {
  return (
    <div className="flex items-center gap-[8px] bg-color-white w-full min-md:w-[70%] min-lg:w-[520px] h-[48px] rounded-full px-[8px]">
      <SearchIcon className="size-[32px] stroke-color-black" />
      <SearchBar.Input value={value} placeholder="Pesquisar processo..." onChange={onChange} />
    </div>
  );
}
