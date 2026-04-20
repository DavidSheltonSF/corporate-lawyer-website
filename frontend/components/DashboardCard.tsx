'use client';

import { DynamicSectionContext, DynamicSectionContextType } from '@/contexts/DynamicSectionContext';
import { ReactNode, useContext } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  sectionIndex?: number;
}

export function DashboardCard({ title, sectionIndex, children }: Props) {
  const context = useContext<DynamicSectionContextType | undefined>(DynamicSectionContext);

  if (!context) {
    throw Error('DynamicSection context was not provided');
  }

  const { setSelectedSection } = context;

  return (
    <div
      className={`flex flex-col bg-color-primary-light h-[160px] rounded-xl py-[16px] flex-[0_1_300px] ${
        sectionIndex !== undefined && 'cursor-pointer'
      }`}
      onClick={() => sectionIndex !== undefined && setSelectedSection(sectionIndex)}
    >
      <h2 className="ml-[24px] font-bold text-[1.5rem]">{title}</h2>
      <div className="flex flex-col gap-[16px] bg-color-primary h-[90%] px-[24px] py-[8px]">
        {children}
      </div>
    </div>
  );
}
