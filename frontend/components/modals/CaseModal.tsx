'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { fetchCaseById } from '@/services/fetchCaseById';
import { FieldValue } from '../FieldValue';
import { CaseFilesSection } from '../CaseFilesSection';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { formatStringList } from '@/lib/formatStringList';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { OpenUploadModalButton } from '../OpenUploadModalButton';

interface Props {
  selectedCaseId: string | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CaseModal({ selectedCaseId, isOpen, setIsOpen }: Props) {
  const [caseData, setCaseData] = useState<CaseWithRelations | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCaseData() {
      try {
        if (!isOpen || !selectedCaseId) return;
        setLoading(true);
        const caseFound = await fetchCaseById(selectedCaseId, ['client', 'lawyers']);
        setCaseData(caseFound);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsOpen(false);
      }
    }

    function cleanCaseDataOnClose() {
      if (isOpen) return;
      setCaseData(null);
    }

    function resetStates() {
      setCaseData(null);
      setIsOpen(false);
    }

    fetchCaseData();
    cleanCaseDataOnClose();

    return () => {
      resetStates;
    };
  }, [isOpen]);

  const lawyersNames = caseData?.lawyers.map(
    (lawyer: any) => `${lawyer.firstName} ${lawyer.lastName}`
  );

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[82vh] min-lg:h-[95vh] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        {loading || !caseData ? (
          <CaseModalSkeleton />
        ) : (
          <div className="flex flex-col size-full bg-color-white">
            <header className="w-full bg-color-primary p-[16px] border-t border-white/50">
              <h1 className="text-3xl text-color-white font-bold ">{caseData.title}</h1>
            </header>
            <main className="flex flex-col w-full text-lg min-lg:text-xl">
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
              </div>
              <div className="flex flex-col gap-[8px] border-b border-black/50 p-[16px]">
                <h1 className="text-2xl font-bold">Resumo</h1>
                <p>{caseData.description}</p>
              </div>
              <div className="flex flex-col gap-[8px] border-b border-black/50">
                <div className="relative w-full bg-color-primary p-[16px]">
                  <h1 className="text-2xl font-bold text-color-white">Arquivos</h1>
                  <div className="absolute right-[16px] top-[50%] translate-y-[-50%]">
                    <OpenUploadModalButton />
                  </div>
                </div>

                <div className="h-[224px] min-lg:h-[316px] overflow-auto">
                  <CaseFilesSection id={selectedCaseId || ''} files={caseData.files} />
                </div>
              </div>
            </main>
          </div>
        )}
      </PrimaryModalWindow>
    )
  );
}
