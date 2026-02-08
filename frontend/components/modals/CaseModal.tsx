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

export function CaseModal() {
  const [caseData, setCaseData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const caseModalContext = useCaseModalContext();

  if (!caseModalContext) {
    throw new MissingContextError('CaseModalContext');
  }

  const { isOpen, setIsOpen, caseId } = caseModalContext;

  useEffect(() => {
    async function fetchCaseData() {
      setLoading(true);
      if (!caseId) {
        return;
      }
      const caseFound = await fetchCaseById(caseId, ['client', 'lawyers']);
      setCaseData(caseFound);
      setLoading(false);
    }

    fetchCaseData();
  }, [isOpen]);

  function closeModal() {
    if (!modalRef.current) return;
    modalRef.current.classList.add('fade-out-animation-fast');
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }

  return (
    isOpen && (
      <div
        ref={modalRef}
        className="fixed z-99999999999 top-[10%] left-1/2 translate-x-[-50%] w-[880px] h-[800px] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black"
      >
        <PrimaryModalWindow
          closeModal={() => {
            closeModal();
          }}
        >
          {loading ? (
            <CaseModalSkeleton />
          ) : (
            <div className="flex flex-col h-full w-full bg-color-primary">
              <div className="w-full h-[64px]"></div>
              <div className="size-full bg-color-white">
                <header className="flex items-center bg-color-primary border-t border-white/50 pl-[24px] py-[16px]">
                  <h1 className=" text-color-white text-4xl">{caseData?.title}</h1>
                </header>
                <main className="h-full text-xl">
                  <div className="flex flex-col gap-[8px] pl-[24px] py-[24px]">
                    <FieldValue field="nº:" value={caseData?.processNumber || ''} />
                    <FieldValue
                      field="cliente:"
                      value={`${caseData?.client?.firstName || ''} ${
                        caseData?.client?.lastName || ''
                      }`}
                    />
                    <FieldValue field="status:" value={caseData?.status || ''} />
                    <FieldValue field="Tribunal:" value={caseData?.court || ''} />
                    <FieldValue field="Vara:" value={caseData?.courtDivision || ''} />
                  </div>
                  <div className="flex flex-col gap-[8px] px-[24px] py-[24px] border-t border-black/30">
                    <h1 className="font-bold text-3xl">Resumo</h1>
                    <p>{caseData?.description || ''}</p>
                  </div>
                  <div className="flex relative items-center h-[56px] bg-color-primary border-t pl-[24px]">
                    <h1 className=" text-color-white text-3xl">Documentação</h1>
                    <div className="absolute top-1/2 translate-y-[-50%] right-[16px]">
                      <OpenUploadModalButton />
                    </div>
                  </div>
                  <CaseFilesSection id={caseId || ''} files={caseData.files} />
                </main>
              </div>
            </div>
          )}
        </PrimaryModalWindow>
      </div>
    )
  );
}
