import { DropdownItem } from './DropdownItem';

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  selectItem: (value: string) => void;
  itemLabel: Record<string, string>;
}

Dropdown.Item = DropdownItem;

export function Dropdown({ selectItem, itemLabel, isOpen, setIsOpen }: Props) {
  const renderItems = Object.entries(itemLabel).map(([key, value], index) => {
    return (
      <Dropdown.Item
        key={index}
        value={value}
        onClick={() => {
          selectItem(key);
          setIsOpen(false);
        }}
      />
    );
  });
  return (
    <ul
      style={{ height: isOpen ? `${40 * Object.entries(itemLabel).length}px` : 0 }}
      className="flex flex-col justify-between bg-color-white text-color-black overflow-hidden transition-[height] duration-300 rounded-md shadow-soft"
    >
      {renderItems}
    </ul>
  );
}
