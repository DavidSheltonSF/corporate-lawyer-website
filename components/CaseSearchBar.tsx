import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { DropDownButton } from './DropdownButton';

interface Props {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  queryType: string;
  setQueryType: Dispatch<SetStateAction<string>>;
}

export function CaseSearchBar({ query, setQuery, queryType, setQueryType }: Props) {
  function handleClick() {
    console.log(query);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchBar = e.target;
    setQuery(searchBar.value);
  }

  return (
    <div className="flex bg-color-white w-[520px] h-[48px] rounded-full p-[2px]">
      <div className="flex flex-1 px-[8px]">
        <input
          name="caseSearchBar"
          className="w-full h-full placeholder:text-black/65 text-black pl-[16px]"
          type="text"
          placeholder="Pesquisar..."
          onChange={handleChange}
          defaultValue={query}
        />
        <DropDownButton
          selectedItem={queryType}
          setSelectedItem={setQueryType}
          listItems={['Nº processo', 'Título']}
        />
      </div>
      <button
        className="flex rounded-r-full  items-center justify-center bg-color-primary h-full w-[72px] cursor-pointer hover:brightness-120 "
        onClick={handleClick}
      >
        <img className="size-[32px]" src="icons/search-white.svg" alt="" />
      </button>
    </div>
  );
}
