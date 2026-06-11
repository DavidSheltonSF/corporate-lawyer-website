import { KeyboardEvent, ChangeEventHandler } from 'react';
import { SearchInput } from './SearchInput';
import { SearchIcon } from '@/components/icons/SearchIcon';

interface Props {
  query: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  action: () => void;
}

SearchBar.Input = SearchInput;

export function SearchBar({ query, onChange, action }: Props) {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      action();
    }
  }

  return (
    <div className="flex items-center gap-[8px] bg-color-white w-full min-md:w-[70%] min-lg:w-[520px] h-[48px] rounded-full px-[8px]">
      <SearchIcon className="size-[32px] stroke-color-black" />
      <SearchBar.Input
        value={query}
        placeholder="Pesquisar processo..."
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
