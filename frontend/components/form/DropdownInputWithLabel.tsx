import { useState } from 'react';

interface Props {
  id: string;
  name: string;
  label: string;
  items: string[];
  itemLabel: Function;
}

export function DropdownInputWithLabel({ id, name, label, items, itemLabel }: Props) {
  const [selectedValue, setSelectedValue] = useState(0);
  const [listIsOpen, setListIsOpen] = useState(false);

  const renderItems = items.map((item, index) => {
    return (
      <li
        onClick={() => {
          setSelectedValue(index);
          setListIsOpen(false);
        }}
        className="bg-white hover:brightness-80 cursor-pointer"
        key={index}
      >
        {itemLabel(item)}
      </li>
    );
  });

  return (
    <div className="w-full">
      <label className="text-[1.3rem]" htmlFor={id}>
        {label}
      </label>
      <div className="flex flex-col relative">
        <input
          onClick={() => setListIsOpen(true)}
          id={id}
          name={name}
          className="border h-[40px] w-full rounded-sm px-[8px]"
          type="text"
          value={itemLabel(items[selectedValue])}
          readOnly
        />
        <div
          className={`absolute z-1 w-full bg-white overflow-hidden w-full top-[100%] h-0 ${
            listIsOpen && 'h-fit border p-[8px]'
          }`}
        >
          <ul>{renderItems}</ul>
        </div>
      </div>
    </div>
  );
}
