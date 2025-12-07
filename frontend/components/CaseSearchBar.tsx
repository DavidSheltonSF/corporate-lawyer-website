import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react';
import { DropDownButton } from './DropdownButton';
import { CaseSearchEnum } from '../types/CaseSearchEnum';
import { UserDataContext } from '@/frontend/contexts/UserDataContext';

interface Props {
  handleClick: any;
  setQuery: Dispatch<SetStateAction<string>>;
  searchType: CaseSearchEnum;
  setSearchType: Dispatch<SetStateAction<CaseSearchEnum>>;
}

export function CaseSearchBar({ handleClick, setQuery, searchType, setSearchType }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const searchBar = e.target;
    setQuery(searchBar.value);
  }

  const context = useContext(UserDataContext);
  const userData = context?.userData;

  const listItems =
    userData?.role === 'client'
      ? [CaseSearchEnum.num_processo, CaseSearchEnum.titulo]
      : Object.values(CaseSearchEnum);

  return (
    <div className="flex gap-[16px] bg-color-white w-[520px] h-[48px] rounded-full p-[2px]">
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
        <DropDownButton
          selectedItem={searchType}
          setSelectedItem={setSearchType}
          listItems={listItems}
        />
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
