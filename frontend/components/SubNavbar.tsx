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
    <nav className="flex items-center justify-center w-full h-[56px] bg-color-primary">
      <ul className="flex items-center justify-center gap-[24px] h-[90%]">
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
