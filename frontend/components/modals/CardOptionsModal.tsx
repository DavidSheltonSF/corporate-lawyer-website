'use client';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { Button } from '../Button';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openDeleteModal: Function;
  openUpdateModal: Function;
}

export function CardOptionsModal({ openDeleteModal, openUpdateModal, isOpen, setIsOpen }: Props) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles="fixed z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[400px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
        closeModal={() => {
          closeModal();
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
          <div className="my-[24px]">
            <p className="text-black text-lg">O que quer fazer?</p>
          </div>
          <div className="flex w-full justify-around">
            <Button
              onclick={() => {
                openUpdateModal();
                closeModal();
              }}
              backgroundColor="var(--primary-color)"
              textColor="var(--white-color)"
            >
              Alterar
            </Button>
            <Button
              onclick={() => {
                openDeleteModal();
                closeModal();
              }}
              backgroundColor="var(--primary-color)"
              textColor="var(--white-color)"
            >
              Excluir
            </Button>
          </div>
        </div>
      </PrimaryModalWindow>
    )
  );
}
