'use case';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from '../ui/Modal/PrimaryModal';
import { Button } from '../ui/Button/Button';

import { deleteCaseById } from '@/services/users/deleteCaseById';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';
import { ConfirmModal } from './ConfirmModal';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';

interface Props {
  selectedCaseId: string | null;
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  loadCases: Function;
}

export function DeleteCaseModal({ selectedCaseId, isOpen, setIsOpen, loadCases }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  useEffect(() => {
    return () => {
      setRequestState(null);
    };
  }, []);

  async function deleteCase() {
    try {
      setRequestState({ status: 'loading' });
      await deleteCaseById(selectedCaseId || '');
      setRequestState({ status: 'ok', message: 'Case deleted successfuly' });
      loadCases();
    } catch (error: any) {
      setRequestState({ status: 'error', message: error.message });
      console.log(error);
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  return (
    isOpen && (
      <ConfirmModal
        requestState={requestState}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => deleteCase()}
        text=" Deseja excluir este processo? Esssa ação não pode ser revertida."
      />
    )
  );
}
