'use client';
import { useEffect, useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { OpenUploadModalButton } from '../../../OpenUploadModalButton';
import { getCasePopulatedById } from '@/services/cases/getCasePopulatedById';
import { WithId } from '@/types/WithId';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { RequestState } from '@/types/RequestState';
import { CaseFilesUploadModal } from '@/components/features/cases/CaseFilesUploadModal/CaseFilesUploadModal';
import { CaseModalHeader } from './CaseModalHeader';
import { CaseModalContent } from './CaseModalContent';
import { CaseModalFiles } from './CaseModalFiles';

interface Props {
  data: unknown;
  close: Function;
}

CaseModal.Header = CaseModalHeader;
CaseModal.Content = CaseModalContent;
CaseModal.Files = CaseModalFiles;

export function CaseModal({ data, close }: Props) {
  const [caseData, setCaseData] = useState<WithId<CaseWithRelations> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
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

  function openUploadModal() {
    setUploadModalIsOpen(true);
  }

  function closeUploadModal() {
    setUploadModalIsOpen(false);
  }

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
      <div className="flex flex-col size-full bg-color-white">
        <CaseModal.Header title={caseData.title} processNumber={caseData.processNumber} />
        <CaseModal.Content caseData={caseData} />
        <CaseModal.Files openUploadModal={openUploadModal} caseFiles={caseData.files} />
      </div>
    );
  }

  if (uploadModalIsOpen) {
    return (
      <CaseFilesUploadModal refetchCase={fetchCaseData} caseId={caseId} close={closeUploadModal} />
    );
  }

  return (
    <PrimaryModal
      additionalStyles={
        'top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[82vh] min-lg:h-[95vh]'
      }
      closeModal={() => {
        close();
      }}
    >
      {renderContent()}
    </PrimaryModal>
  );
}
