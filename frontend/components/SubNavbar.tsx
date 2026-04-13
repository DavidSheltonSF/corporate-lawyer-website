'use client';

import { SubNavbarItem } from './SubNavbarItem';

interface Props {
  itemsNames: string[];
  selectedSection: number;
  setSelectedSection: any;
}

export function SubNavbar(props: Props) {
  const { itemsNames, selectedSection, setSelectedSection } = props;

  return (
    <nav className="w-full h-[56px] bg-color-primary">
      <ul className="flex items-center gap-[24px] size-full px-[16px] bg-black overflow-x-scroll">
        {itemsNames
          ? itemsNames.map((itemName, index) => {
              return (
                <SubNavbarItem
                  key={`subnav-item${index}`}
                  index={index}
                  name={itemName}
                  selected={selectedSection}
                  setSelected={setSelectedSection}
                />
              );
            })
          : ''}
      </ul>
    </nav>
  );
}
