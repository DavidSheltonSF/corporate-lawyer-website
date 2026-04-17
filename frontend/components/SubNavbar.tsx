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
      <ul className="flex items-center gap-[24px] size-full px-[16px] bg-primary-color overflow-x-scroll min-md:overflow-x-auto min-md:justify-center">
        {itemsNames
          ? itemsNames.map((itemName, index) => {
              return (
                <SubNavbarItem
                  key={`subnav-item${index}`}
                  index={index}
                  label={itemName}
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
