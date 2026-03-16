'use client';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { Button } from '../Button';
import { deleteClient } from '@/services/deleteClient';
import { useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';

interface Props {
  isOpen: boolean;
  closeModal: Function;
  selectedUserId: string | null;
  loadClients: () => void;
}

export function ClientCardOptionsModal({ isOpen, closeModal, selectedUserId, loadClients }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function onDeleteClick() {
    try {
      setRequestState({ status: 'loading' });
      const result = await deleteClient(selectedUserId || '');
      setRequestState({
        status: 'ok',
        message: `${result.firstName} ${result.lastName} was deleted successfully`,
      });
      loadClients();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles="fixed z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[360px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
        closeModal={() => {
          setRequestState(null);
          closeModal();
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
          <div className="my-[24px]">
            <RequestFeedback requestState={requestState} />
          </div>
          <Button backgroundColor="var(--primary-color)" textColor="var(--white-color)">
            Alterar Dados
          </Button>
          <Button
            onclick={onDeleteClick}
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
