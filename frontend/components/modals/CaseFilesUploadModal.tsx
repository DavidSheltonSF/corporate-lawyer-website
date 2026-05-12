'use client';
import React, { useState } from 'react';
import { PrimaryModal } from '../ui/Modal/PrimaryModal';
import { uploadCaseFile } from '@/services/cases/uploadCaseFile';
import { RequestState } from '@/types/RequestState';
import { DropArea } from '../DropArea';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { useCaseFilesUploadModalContext } from '@/hooks/useCaseFilesUploadModalContext';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { useSelectedCaseContext } from '@/hooks/useSelectedCaseContext';

export function CaseFilesUploadModal() {
  const [uploadState, setUploadState] = useState<null | RequestState>(null);
  const { selectedCaseId } = useSelectedCaseContext();
  const { isOpen, setIsOpen } = useCaseFilesUploadModalContext();
  const caseModalContext = useCaseModalContext();
  const setCaseModalIsOpen = caseModalContext.setIsOpen;

  function closeModal() {
    if (uploadState?.status === 'loading') return;
    setIsOpen(false);
    setCaseModalIsOpen(true);
    setUploadState(null);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploadState({ status: 'loading' });
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();

      formData.append('file', file);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await uploadCaseFile(formData, selectedCaseId);
      setUploadState({ status: 'ok', message: 'Arquivo adicionado com sucesso!' });
    } catch (error) {
      setUploadState({ status: 'error', message: 'Arquivo não adicionado' });
      console.log(error);
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  async function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    try {
      const fileItems = e.dataTransfer.files;
      const fileItem = fileItems[0];
      if (!fileItem) return;

      e.preventDefault();

      if (fileItem.type !== 'application/pdf') {
        setUploadState({ status: 'error', message: 'Apenas PDF(s) são permitidos' });
        return;
      }

      if (fileItem.size > 10 * 1000000) {
        setUploadState({ status: 'error', message: 'Arquivos devem ter no máximo 10mb' });
        return;
      }

      setUploadState({ status: 'loading' });

      const formData = new FormData();
      formData.append('file', fileItem);

      await uploadCaseFile(formData, selectedCaseId);

      setUploadState({ status: 'ok', message: 'Arquivo adicionado com sucesso!' });
    } catch (error) {
      console.log(error);
      setUploadState({ status: 'error', message: 'Arquivo não adicionado' });
    }
  }

  return (
    isOpen && (
      <PrimaryModal
        additionalStyles="z-2 fixed top-[25%] left-1/2 translate-x-[-50%] w-[360px] h-[320px] rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
        closeModal={() => {
          closeModal();
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-end p-[4px]">
          {(uploadState?.status === 'ok' || uploadState?.status === 'error') && (
            <RequestFeedback requestState={uploadState} />
          )}
          <DropArea uploadState={uploadState} handleChange={handleChange} handleDrop={handleDrop} />
        </div>
      </PrimaryModal>
    )
  );
}
