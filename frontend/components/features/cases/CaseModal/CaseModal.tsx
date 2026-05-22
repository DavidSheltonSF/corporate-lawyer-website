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
import { CaseFilesModal } from '../CaseFilesModal/CaseFilesModal';
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
  const [caseData, setCaseData] = useState<WithId<CaseWithRelations> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [filesModalIsOpen, setFilesModalIsOpen] = useState(false);
  const isLoading = requestState?.status === 'loading';
  const error = requestState?.status === 'error';
  const caseId = payload.caseId;
  const {openModal} = useModal()

  async function fetchCaseData() {
    try {
      if (!caseId) return;
      setRequestState({ status: 'loading' });
      const caseFound = await getCasePopulatedById(caseId);
      setCaseData(caseFound);
      setRequestState({ status: 'ok' });
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
    setCaseData(null);
    setRequestState(null);
  }

  useEffect(() => {
    fetchCaseData();

    return () => {
      resetStates();
    };
  }, []);

  if (filesModalIsOpen) {
    return (
      <CaseFilesModal
        caseId={caseData?.id || ''}
        caseFiles={caseData?.files}
        close={() => setFilesModalIsOpen(false)}
        refetchCaseFiles={fetchCaseData}
      />
    );
  }


  function renderSkeleton() {
    return <CaseModalSkeleton />;
  }

  function renderContent() {
    return (
      <div className="flex flex-col size-full">
        <CaseModal.Header title={caseData?.title} processNumber={caseData?.processNumber} />
        <CaseModal.Content caseData={caseData} />
        <CaseModal.Footer
          openFilesModal={() => setFilesModalIsOpen(true)}
          openDeadlinesModal={() => openModal('deadlines', {caseId})}
        />
      </div>
    );
  }

  return (
    <BaseModal
      className={'w-[90%] min-md:w-[60%] min-lg:w-[880px]'}
      onClose={() => {
        close();
      }}
    >
      {isLoading && renderSkeleton()}
      {error || !caseData ? (
        <ModalFeedback
          title="Não foi possível acessar o processo"
          message={requestState?.message}
        />
      ) : (
        renderContent()
      )}
    </BaseModal>
  );
}
