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
import { Button } from '@/components/ui/Button/Button';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { CaseFilesModal } from '../CaseFilesModal/CaseFilesModal';

interface Props {
  data: unknown;
  close: Function;
}

CaseModal.Header = CaseModalHeader;
CaseModal.Content = CaseModalContent;

export function CaseModal({ data, close }: Props) {
  const [caseData, setCaseData] = useState<WithId<CaseWithRelations> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [filesModalIsOpen, setFilesModalIsOpen] = useState(false);
  const isLoading = requestState?.status === 'loading';
  const error = requestState?.status === 'error';

  const caseModalData = data as { caseId: string };
  const caseId = caseModalData.caseId;

  async function fetchCaseData() {
    try {
      if (!caseId) return;
      setRequestState({ status: 'loading' });
      const caseFound = await getCasePopulatedById(caseId);
      setCaseData(caseFound);
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
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

  function renderContent() {
    if (isLoading) {
      return <CaseModalSkeleton />;
    }

    if (error || !caseData) {
      return (
        <div className="flex flex-col items-center size-ful pt-[80px] px-[24px] text-center gap-[16px]">
          <h1>Proceso não encontrado</h1>
          <h3>O processo procurado foi removido do sistema ou não existe</h3>
        </div>
      );
    }

    return (
      <div className="flex flex-col size-full overflow-y-scroll">
        <CaseModal.Header title={caseData.title} processNumber={caseData.processNumber} />
        <CaseModal.Content caseData={caseData} />
        <footer className="py-[8px] px-[24px]">
          <Button
            onClick={() => setFilesModalIsOpen(true)}
            className="bg-color-white hover:brightness-95 p-[8px]"
          >
            <DocumentIcon label="Arquivos" className="size-[24px]" />
          </Button>
        </footer>
      </div>
    );
  }

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

  return (
    <BaseModal
      className={'top-[40px] min-lg:w-[880px]'}
      onClose={() => {
        close();
      }}
    >
      {renderContent()}
    </BaseModal>
  );
}
