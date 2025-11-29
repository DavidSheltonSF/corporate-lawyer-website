import { Activity, ReactNode } from 'react';

interface Props {
  index: number;
  title: string;
  selectedSection: number;
  children: ReactNode;
}

export function DynamicSectionWrapper({
  index,
  title,
  selectedSection,
  children,
}: Props) {
  const isSelected = index === selectedSection;

  return (
    <Activity mode={isSelected ? 'visible' : 'hidden'}>
      <section className="flex flex-col fade-in-animation text-white w-full h-full">
        <h1 className="font-bold text-[3rem] my-[40px]">{title}</h1>
        {children}
      </section>
    </Activity>
  );
}
