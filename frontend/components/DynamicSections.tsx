'use client';
import { Children, ReactElement, useState } from 'react';
import { SubNavbar } from './layout/SubNavbar/SubNavbar';
import { DynamicSectionWrapper } from './DynamicSectionWrapper';
import { DynamicSection } from './DynamicSection';
import { DynamicSectionProvider } from '@/contexts/DynamicSectionProvider';

interface Props {
  sectionsNames: string[];
  children: ReactElement<typeof DynamicSection> | ReactElement<typeof DynamicSection>[];
}

export function DynamicSections({ sectionsNames, children }: Props) {
  const [selectedSection, setSelectedSection] = useState(0);
  return (
    <section className="flex flex-col items-center w-full min-h-[90vh] h-auto pb-[80px]">
      <SubNavbar
        itemsNames={sectionsNames}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <div className="flex justify-center items-center w-[80%] h-full">
        <DynamicSectionProvider setSelectedSection={setSelectedSection}>
          {Children.map(children, (child, index) => {
            return (
              <DynamicSectionWrapper
                key={index}
                index={index}
                title={sectionsNames[index]}
                selectedSection={selectedSection}
              >
                {child}
              </DynamicSectionWrapper>
            );
          })}
        </DynamicSectionProvider>
      </div>
    </section>
  );
}
