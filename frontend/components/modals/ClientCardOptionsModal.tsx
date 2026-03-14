'use client';
import { Dispatch, SetStateAction } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { Button } from '../Button';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ClientCardOptionsModal({ isOpen, setIsOpen }: Props) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles="fixed z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[360px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
        closeModal={() => {
          closeModal();
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
          <Button backgroundColor="var(--primary-color)" textColor="var(--white-color)">
            Alterar Client
          </Button>
          <Button backgroundColor="var(--primary-color)" textColor="var(--white-color)">
            Deletar Client
          </Button>
        </div>
      </PrimaryModalWindow>
    )
  );
}
