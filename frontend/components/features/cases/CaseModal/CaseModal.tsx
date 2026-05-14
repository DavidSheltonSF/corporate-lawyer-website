'use client';
import { useEffect, useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
import { FieldValue } from '../../../FieldValue';
import { CaseFilesSection } from '../../../CaseFilesSection';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { formatStringList } from '@/lib/formatStringList';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { OpenUploadModalButton } from '../../../OpenUploadModalButton';
import { getCasePopulatedById } from '@/services/cases/getCasePopulatedById';
import { WithId } from '@/types/WithId';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CityLabel } from '@/lib/CityLabel';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { useCaseFilesUploadModalContext } from '@/hooks/useCaseFilesUploadModalContext';
import { useSelectedCaseContext } from '@/hooks/useSelectedCaseContext';
import { RequestState } from '@/types/RequestState';
import { CaseFilesUploadModal } from '@/components/modals/CaseFilesUploadModal';

interface Props {
  data: unknown;
  close: Function;
}

export function CaseModal({ data, close }: Props) {
  const [caseData, setCaseData] = useState<WithId<CaseWithRelations> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const isLoading = requestState?.status === 'loading';
  const error = requestState?.status === 'error';
  const lawyersNames = caseData?.lawyers.map(
    (lawyer: any) => `${lawyer.firstName} ${lawyer.lastName}`
  );

  const caseModalData = data as { caseId: string };
  const caseId = caseModalData.caseId;

  useEffect(() => {
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

    function cleanCaseDataOnClose() {
      setCaseData(null);
    }

    function resetStates() {
      setCaseData(null);
    }

    fetchCaseData();
    cleanCaseDataOnClose();

    return () => {
      resetStates;
    };
  }, []);

  function openUploadModal() {
    setUploadModalIsOpen(true);
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
        <header className="w-full bg-color-primary p-[16px] border-t border-white/50">
          <h1 className="text-3xl text-color-white font-bold ">{caseData?.title || ''}</h1>
        </header>
        <div className="flex flex-col w-full text-lg min-lg:text-xl">
          <div>
            <div className="flex flex-col gap-[8px] border-b border-black/50 p-[16px]">
              <FieldValue field="nº:" value={caseData.processNumber} />
              <FieldValue
                field="cliente:"
                value={`
                    ${caseData.client.firstName} ${caseData.client.lastName}
                    `}
              />
              <FieldValue field="advogados:" value={formatStringList(lawyersNames || [])} />
              <FieldValue field="status:" value={CaseStatusLabel[caseData.status]} />
              <FieldValue field="tribunal:" value={caseData.court} />
              <FieldValue field="vara:" value={caseData.courtDivision} />
              <FieldValue field="estado:" value={BrazilStateLabel[caseData.location.state]} />
              <FieldValue field="cidade:" value={CityLabel[caseData.location.city]} />
            </div>
            <div className="flex flex-col gap-[8px] border-b border-black/50 p-[16px]">
              <h1 className="text-2xl font-bold">Resumo</h1>
              <p>{caseData.description}</p>
            </div>
            <div className="flex flex-col gap-[8px] border-b border-black/50">
              <div className="relative w-full bg-color-primary p-[16px]">
                <h1 className="text-2xl font-bold text-color-white">Arquivos</h1>
                <div className="absolute right-[16px] top-[50%] translate-y-[-50%]">
                  <OpenUploadModalButton handleClick={openUploadModal} />
                </div>
              </div>

              <div className="h-[224px] min-lg:h-[316px] overflow-auto">
                <CaseFilesSection id={caseId || ''} files={caseData.files} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if(uploadModalIsOpen){
    return <CaseFilesUploadModal caseId={caseId} close={() => setUploadModalIsOpen(false)} />
  }

  return (
    <PrimaryModal
      additionalStyles={
        'fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[82vh] min-lg:h-[95vh] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
      }
      closeModal={() => {
        close();
      }}
    >
      {renderContent()}
    </PrimaryModal>
  );
}
