'use client';
import { ReactNode } from 'react';

interface Props {
  action?: any;
  children: ReactNode;
}

export function Form({ action, children }: Props) {
  return (
    <form
      className="flex flex-col w-[90%] lg:w-[480px] bg-color-primary border-[2px] border-color-primary-light rounded-[16px] px-[24px] py-[40px]  gap-[32px] text-color-white text-xl"
      action={action}
    >
      {children}
    </form>
  );
}
