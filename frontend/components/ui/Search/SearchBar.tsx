import { ChangeEvent, Dispatch, SetStateAction, KeyboardEvent, useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';

interface Props {
  setQuery: Dispatch<SetStateAction<string>>;
}

SearchBar.Input = SearchInput;

export function SearchBar({ setQuery }: Props) {
  const [text, setText] = useState('');
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchBar = e.target;
    setText(searchBar.value);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      setQuery(text);
    }
  }

  return (
    <div className="flex gap-[16px] bg-color-white w-full min-md:w-[70%] min-lg:w-[520px] h-[48px] rounded-full p-[2px]">
      <div className="flex gap-[16px] flex-1 rounded-full overflow-hidden">
        <SearchBar.Input
          value={text}
          placeholder="Pesquisar processo..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex gap-[2px]">
        <button
          className="flex rounded-r-full items-center justify-center bg-color-primary h-full w-[72px] cursor-pointer hover:brightness-120 "
          onClick={() => setQuery(text)}
        >
          <img className="size-[32px]" src="icons/search-white.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
