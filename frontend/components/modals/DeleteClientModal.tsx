'use client';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { Button } from '../Button';
import { deleteUser } from '@/services/deleteUser';
import { useContext, useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';
import { DeleteClientModalContext } from '@/contexts/modals/DeleteClientModalContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { InputWithLabel } from '../form/InputWithLabel';

interface Props {
  loadClients: Function;
}

export function DeleteClientModal({ loadClients }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [confirmInputText, setConfrimInputText] = useState('');
  const deleteClientModalContext = useContext(DeleteClientModalContext);
  if (!deleteClientModalContext) {
    throw new MissingContextError(DeleteClientModalContext.name);
  }

  const { isOpen, setIsOpen, selectedClient } = deleteClientModalContext;

  async function onDeleteClick() {
    try {
      setRequestState({ status: 'loading' });
      const result = await deleteUser(selectedClient?.id || '');
      setRequestState({
        status: 'ok',
        message: `${result.firstName} ${result.lastName} foi deletado com sucessso`,
      });
      loadClients();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  useEffect(() => {
    return () => {
      setRequestState(null);
      setConfrimInputText('');
    };
  }, []);

  const confirmDeletionString =
    `DELETAR ${selectedClient?.firstName} ${selectedClient?.lastName}`.toUpperCase();

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles="fixed z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[360px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
        closeModal={() => {
          setConfrimInputText('');
          setRequestState(null);
          setIsOpen(false);
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
          <div className="my-[24px]">
            <RequestFeedback requestState={requestState} />
            <p className="text-black text-lg">Para confirmar digite abaixo:</p>
            <p className="text-black text-lg text-red-600 font-bold">{confirmDeletionString}</p>
          </div>
          <div className="bg-blue-200 text-black w-full">
            <input
              className="w-full px-[8px] py-[4px]"
              value={confirmInputText}
              type="text"
              onChange={(e) => setConfrimInputText(e.target.value.toUpperCase())}
            />
          </div>
          <Button
            onclick={() => onDeleteClick()}
            backgroundColor={
              confirmInputText !== confirmDeletionString ? '#888888' : 'var(--primary-color)'
            }
            textColor="var(--white-color)"
            disabled={confirmInputText !== confirmDeletionString}
          >
            Confrimar
          </Button>
        </div>
      </PrimaryModalWindow>
    )
  );
}
