import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

interface Props {
  setQuery: Dispatch<SetStateAction<string>>;
}

SearchBar.Input = SearchInput;
SearchBar.Button = SearchButton;

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

  function handleClick(e: MouseEvent) {
    setQuery(text);
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
        <SearchBar.Button onClick={handleClick} />
      </div>
    </div>
  );
}
