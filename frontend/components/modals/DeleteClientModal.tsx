'use client';
import { BaseModal } from '../ui/Modal/BaseModal';
import { deleteUser } from '@/services/users/deleteUser';
import { useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { WithId } from '@/types/WithId';
import { UserSlice } from '@/types/UserSlice';
import { ButtonVariant } from '../ui/Button/ButtonVariant';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { SafeUser } from '@/types/SafeUser';

interface Props {
  clientSlice: WithId<UserSlice>;
  fetchClients: () => void;
}

export function DeleteClientModal({ payload, close }: GlobalModalProps<Props>) {
  const [requestState, setRequestState] = useState<RequestState<WithId<SafeUser>>>({
    status: 'idle',
  });
  const [confirmInputText, setConfrimInputText] = useState('');
  const { clientSlice, fetchClients } = payload;
  const { id, firstName, lastName } = clientSlice;
  const confirmDeletionString = `DELETAR ${firstName} ${lastName}`.toUpperCase();
  const confirmInputIsValid = confirmInputText == confirmDeletionString;

  async function onDeleteClick() {
    const response = await deleteUser(id);

    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
      return;
    }

    fetchClients();
    setRequestState({ status: 'ok', data: response.data });
  }

  useEffect(() => {
    return () => {
      setRequestState({ status: 'idle' });
      setConfrimInputText('');
    };
  }, []);

  return (
    <BaseModal
      title="Excluir cliente"
      onConfirm={onDeleteClick}
      confirmButtonVariant={confirmInputIsValid ? ButtonVariant.DANGER : ButtonVariant.DISABLED}
      className="h-fit w-[90%] min-md:w-[356px]"
      onClose={close}
    >
      <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
        <div className="my-[24px]">
          {requestState.status === 'idle' ? (
            <div className="flex flex-col">
              <p className="text-black text-lg">Para confirmar digite abaixo:</p>
              <p className="text-black text-lg text-red-600 font-bold">{confirmDeletionString}</p>
            </div>
          ) : (
            <RequestFeedback requestState={requestState} />
          )}
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
