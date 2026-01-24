'use client';
import { ReactNode } from 'react';

interface Props {
  closeModal: Function;
  children: ReactNode;
}

export function SecondaryModalWindow({ closeModal, children }: Props) {
  return (
    <div
      className={`flex relative flex-col size-[100%] text-color-white font-bold bg-color-black-dark p-[16px]`}
    >
      <div>{children}</div>

      <button
        className="w-full mt-auto rounded-full py-[8px] lg:absolute  lg:w-[88px] lg:rounded-md lg:right-[16px] bottom-[16px] bg-color-secondary text-color-black font-bold cursor-pointer hover:brightness-150"
        onClick={() => closeModal()}
      >
        Ok
      </button>
    </div>
  );
}
