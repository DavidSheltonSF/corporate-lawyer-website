import { MouseEventHandler } from 'react';

interface Props {
  value: string;
  onClick: MouseEventHandler<HTMLLIElement>;
}

export function DropdownItem({ value, onClick }: Props) {
  return (
    <li className="p-[8px] bg-color-white hover:brightness-95 cursor-pointer" onClick={onClick}>
      {value}
    </li>
  );
}
