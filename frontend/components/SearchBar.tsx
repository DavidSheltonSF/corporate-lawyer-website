import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react';

interface Props {
  handleClick: any;
  setQuery: Dispatch<SetStateAction<string>>;
}

export function SearchBar({ handleClick, setQuery }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchBar = e.target;
    setQuery(searchBar.value);
  }

  return (
    <div className="flex gap-[16px] bg-color-white w-full min-md:w-[70%] min-lg:w-[520px] h-[48px] rounded-full p-[2px]">
      <div className="flex gap-[16px] flex-1 rounded-full overflow-hidden">
        <input
          name="caseSearchBar"
          className="w-full h-full placeholder:text-black/65 text-black pl-[14px]"
          type="text"
          placeholder="Pesquisar..."
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-[2px]">
        <button
          className="flex rounded-r-full items-center justify-center bg-color-primary h-full w-[72px] cursor-pointer hover:brightness-120 "
          onClick={handleClick}
        >
          <img className="size-[32px]" src="icons/search-white.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
