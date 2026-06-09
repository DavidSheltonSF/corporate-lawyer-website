'use client';

import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export function DashboardCard({ title, children }: Props) {
  return (
    <div
      className={`flex flex-col bg-color-primary-light h-[160px] rounded-xl py-[16px] flex-[0_1_300px]`}
    >
      <h2 className="ml-[24px] font-bold text-[1.5rem]">{title}</h2>
      <div className="flex flex-col gap-[16px] bg-color-primary h-[90%] px-[24px] py-[8px]">
        {children}
      </div>
    </div>
  );
}
