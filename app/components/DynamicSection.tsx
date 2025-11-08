import { Activity, ReactNode, useContext } from 'react';

interface Props {
  index: number;
  title: string;
  selectedSection: number;
  style: string;
  children: ReactNode;
}

export function DynamicSection({ index, title, selectedSection, style, children }: Props) {
  const isSelected = index === selectedSection;

  return (
    <Activity mode={isSelected ? 'visible' : 'hidden'}>
      <section className={style}>
        <h1 className="font-bold text-[3rem] mt-[40px]">{title}</h1>
        {children}
      </section>
    </Activity>
  );
}
