'use client';
import { useEffect, useRef, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { MissingContextError } from '@/errors/MissingContextError';
import { fetchCaseById } from '@/services/fetchCaseById';
import { FieldValue } from '../FieldValue';
import { OpenUploadModalButton } from '../OpenUploadModalButton';
import { CaseFilesSection } from '../CaseFilesSection';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { CaseModalSkeleton } from './CaseModalSkeleton';
import { formatStringList } from '@/lib/formatStringList';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CaseWithRelations } from '@/types/CaseWithRelations';

export function CaseModal() {
  const [caseData, setCaseData] = useState<CaseWithRelations | null>(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const caseModalContext = useCaseModalContext();

  if (!caseModalContext) {
    throw new MissingContextError('CaseModalContext');
  }

  const { isOpen, setIsOpen, caseId } = caseModalContext;

  useEffect(() => {
    async function fetchCaseData() {
      try {
        if (!isOpen || !caseId) return;
        setLoading(true);
        const caseFound = await fetchCaseById(caseId, ['client', 'lawyers']);
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

  function closeModal() {
    if (!modalRef.current) return;
    modalRef.current.classList.add('fade-out-animation-fast');
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }

  const lawyersNames = caseData?.lawyers.map(
    (lawyer: any) => `${lawyer.firstName} ${lawyer.lastName}`
  );

  return (
    isOpen && (
      <div
        ref={modalRef}
        className="fixed z-99999999999 top-[2%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[880px] h-[82vh] min-lg:h-[95vh] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black"
      >
        <PrimaryModalWindow
          closeModal={() => {
            closeModal();
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
                  <div className="w-full bg-color-primary p-[16px]">
                    <h1 className="text-2xl font-bold text-color-white">Arquivos</h1>
                  </div>

                  <div className="h-[224px] min-lg:h-[316px] overflow-auto">
                    <CaseFilesSection id={caseId || ''} files={caseData.files} />
                  </div>
                </div>
              </main>
            </div>
          )}
        </PrimaryModalWindow>
      </div>
    )
  );
}
