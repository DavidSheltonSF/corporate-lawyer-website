'use client';
import { useEffect, useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { getCasePopulatedById } from '@/services/cases/getCasePopulatedById';
import { WithId } from '@/types/WithId';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { RequestState } from '@/types/RequestState';
import { CaseModalHeader } from './CaseModalHeader';
import { CaseModalContent } from './CaseModalContent';
import { CaseModalFooter } from './CaseModalFooter';
import { NotFoundError } from '@/errors/NotFoundError';
import { ServerError } from '@/errors/ServerError';
import { ModalFeedback } from '@/components/ui/Feedback/ModalFeedback';
import { useModal } from '@/hooks/useModal';
import { GlobalModalProps } from '@/types/GlobalModalProps';

interface Props {
  caseId: string;
}

CaseModal.Header = CaseModalHeader;
CaseModal.Content = CaseModalContent;
CaseModal.Footer = CaseModalFooter;

export function CaseModal({ payload, close }: GlobalModalProps<Props>) {
  const [requestState, setRequestState] = useState<RequestState<WithId<CaseWithRelations>>>({
    status: 'idle',
  });
  const caseId = payload.caseId;
  const { openModal } = useModal();

  async function fetchCaseData() {
    try {
      if (!caseId) return;
      setRequestState({ status: 'loading' });
      const caseFound = await getCasePopulatedById(caseId);
      setRequestState({ status: 'ok', data: caseFound });
    } catch (error: any) {
      console.log(error);

      if (error instanceof NotFoundError) {
        setRequestState({
          status: 'error',
          message: 'O processo procurado foi removido do sistema ou não existe',
        });
      }

      if (error instanceof ServerError) {
        setRequestState({
          status: 'error',
          message: 'Houve algum erro no servidor',
        });
      }

      if (error instanceof UnauthorizedError) {
        handleLogout();
      }

      setRequestState({ status: 'error', message: error.message });
    }
  }

  function resetStates() {
    setRequestState({ status: 'idle' });
  }

  useEffect(() => {
    fetchCaseData();

    return () => {
      resetStates();
    };
  }, []);

  function renderContent() {
    switch (requestState.status) {
      case 'loading':
        return <CaseModalSkeleton />;
      case 'ok':
        const { title, processNumber } = requestState.data;
        return (
          <div className="flex flex-col size-full">
            <CaseModal.Header title={title} processNumber={processNumber} />
            <CaseModal.Content caseData={requestState.data} />
            <CaseModal.Footer
              openFilesModal={() =>
                openModal(
                  'case-files',
                  { caseId },
                  {
                    type: 'case',
                    data: { caseId },
                  }
                )
              }
              openDeadlinesModal={() =>
                openModal(
                  'deadlines',
                  { caseId },
                  {
                    type: 'case',
                    data: { caseId },
                  }
                )
              }
            />
          </div>
        );

      case 'error':
        return (
          <ModalFeedback
            title="Não foi possível acessar o processo"
            message={requestState?.message}
          />
        );
      default:
        return null;
    }
  }

  return (
    <BaseModal
      omitFooter
      className={'w-[90%] min-md:w-[60%] min-lg:w-[880px] min-lg:min-h-[600px]'}
      onClose={() => {
        close();
      }}
    >
      {renderContent()}
    </BaseModal>
  );
}
