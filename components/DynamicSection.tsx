import { Activity, ReactNode } from 'react';

interface Props {
  index: number;
  title: string;
  selectedSection: number;
  additionalStyle?: string;
  children: ReactNode;
}

export function DynamicSection({
  index,
  title,
  selectedSection,
  additionalStyle,
  children,
}: Props) {
  const isSelected = index === selectedSection;

  return (
    <Activity mode={isSelected ? 'visible' : 'hidden'}>
      <section
        className={`flex flex-col fade-in-animation text-white w-full h-full ${additionalStyle}`}
      >
        <h1 className="font-bold text-[3rem] my-[40px]">{title}</h1>
        {children}
      </section>
    </Activity>
  );
}
