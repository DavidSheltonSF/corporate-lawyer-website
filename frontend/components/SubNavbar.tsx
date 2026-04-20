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
    <nav className="flex w-full h-fit bg-color-primary">
      <ul className="flex items-center justify-center gap-[24px] size-full p-[8px] bg-primary-color flex-wrap min-md:justify-center">
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
