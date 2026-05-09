import { SearchIcon } from '@/components/icons/SearchIcon';

interface Props {
  onClick: React.MouseEventHandler;
}

export function SearchButton({ onClick }: Props) {
  return (
    <button
      className="flex rounded-r-full items-center justify-center bg-color-primary h-full w-[72px] cursor-pointer hover:brightness-120 "
      onClick={onClick}
    >
      <SearchIcon color="var(--white-color)" width="32px" height="32px" />
    </button>
  );
}
