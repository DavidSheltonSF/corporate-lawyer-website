'use client';
import { BaseModal } from '../ui/Modal/BaseModal';
import { deleteUser } from '@/services/users/deleteUser';
import { useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { WithId } from '@/types/WithId';
import { UserSlice } from '@/types/UserSlice';
import { ButtonVariant } from '../ui/Button/ButtonVariant';

interface Props {
  data: { clientSlice: WithId<UserSlice>; loadClients: () => void };
  close: () => void;
}

export function DeleteClientModal({ data, close }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [confirmInputText, setConfrimInputText] = useState('');
  const { clientSlice, loadClients } = data;
  const { id, firstName, lastName } = clientSlice;

  const confirmDeletionString = `DELETAR ${firstName} ${lastName}`.toUpperCase();

  const confirmInputIsValid = confirmInputText == confirmDeletionString;

  async function onDeleteClick() {
    try {
      if (!confirmInputIsValid) return;
      setRequestState({ status: 'loading' });
      const result = await deleteUser(id);
      setRequestState({
        status: 'ok',
        message: `${result.firstName} ${result.lastName} foi deletado com sucessso`,
      });
      loadClients();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    return () => {
      setRequestState(null);
      setConfrimInputText('');
    };
  }, []);

  return (
    <BaseModal
      title="Excluir cliente"
      onConfirm={onDeleteClick}
      confirmButtonVariant={confirmInputIsValid ? ButtonVariant.DANGER : ButtonVariant.DISABLED}
      className="top-[15%] left-1/2 translate-x-[-50%] w-[360px] h-fit"
      onClose={close}
    >
      <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
        <div className="my-[24px]">
          {requestState ? (
            <RequestFeedback requestState={requestState} />
          ) : (
            <div className="flex flex-col">
              <p className="text-black text-lg">Para confirmar digite abaixo:</p>
              <p className="text-black text-lg text-red-600 font-bold">{confirmDeletionString}</p>
            </div>
          )}
          <RequestFeedback requestState={requestState} />
        </div>
        <div className="bg-blue-200 text-black w-full">
          <input
            className="w-full px-[8px] py-[4px]"
            value={confirmInputText}
            type="text"
            onChange={(e) => setConfrimInputText(e.target.value.toUpperCase())}
          />
        </div>
      </div>
    </BaseModal>
  );
}
