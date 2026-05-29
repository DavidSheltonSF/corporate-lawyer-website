'use client';
import { useEffect, useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { getCasePopulatedById } from '@/services/cases/getCasePopulatedById';
import { WithId } from '@/types/WithId';
import { handleLogout } from '@/lib/handleLogout';
import { RequestState } from '@/types/RequestState';
import { CaseModalHeader } from './CaseModalHeader';
import { CaseModalContent } from './CaseModalContent';
import { CaseModalFooter } from './CaseModalFooter';
import { ModalFeedback } from '@/components/ui/Feedback/ModalFeedback';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { useModalWithReturn } from '@/hooks/useModalWithReturn';

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
  const caseId = payload?.caseId;

  const openModalWithReturn = useModalWithReturn<Props>({
    type: 'case',
    payload: { caseId },
  });

  async function fetchCaseData() {
    setRequestState({ status: 'loading' });

    const response = await getCasePopulatedById(caseId);

    if (!response.success) {
      const { code, message, details } = response;
      return setRequestState({ status: 'error', code, message, details });
    }

    setRequestState({ status: 'ok', data: response.data });
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

  useEffect(() => {
    if (requestState.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
  }, [requestState]);

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
              openFilesModal={() => openModalWithReturn('case-files', { caseId })}
              openDeadlinesModal={() => openModalWithReturn('deadlines', { caseId })}
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
