'use client';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { Button } from '../Button';
import { useContext } from 'react';
import { DeleteClientModalContext } from '@/contexts/modals/DeleteClientModalContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { ClientCardOptionsModalContext } from '@/contexts/modals/ClientCardOptionsModalContext';

export function ClientCardOptionsModal() {
  const clientCardOptionsModalContext = useContext(ClientCardOptionsModalContext);
  if (!clientCardOptionsModalContext) {
    throw new MissingContextError(ClientCardOptionsModalContext.name);
  }

  const deleteClientModalContext = useContext(DeleteClientModalContext);
  if (!deleteClientModalContext) {
    throw new MissingContextError(DeleteClientModalContext.name);
  }

  const setDeleteModalIsOpen = deleteClientModalContext.setIsOpen;
  const { isOpen } = clientCardOptionsModalContext;
  const setClientOptionsModalIsOpen = clientCardOptionsModalContext.setIsOpen;

  function closeModal() {
    setClientOptionsModalIsOpen(false);
  }

  function openDeleteClientModal() {
    setDeleteModalIsOpen(true);
    closeModal();
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
          <div className="my-[24px]">
            <p className="text-black text-lg">O que quer fazer?</p>
          </div>
          <Button backgroundColor="var(--primary-color)" textColor="var(--white-color)">
            Alterar Dados
          </Button>
          <Button
            onclick={openDeleteClientModal}
            backgroundColor="var(--primary-color)"
            textColor="var(--white-color)"
          >
            Deletar Cliente
          </Button>
        </div>
      </PrimaryModalWindow>
    )
  );
}
