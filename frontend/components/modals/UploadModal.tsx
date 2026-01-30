'use client';
import { UploadModalContext } from '@/contexts/modals/UploadModalContext';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { fetchUploadCaseFile } from '@/services/fetchUploadCaseFile';
import { RequestState } from '@/types/RequestState';
import { DropArea } from '../DropArea';

export function UploadModal({
  caseId,
  setUpdateFiles,
}: {
  caseId: string;
  setUpdateFiles: Dispatch<SetStateAction<boolean>>;
}) {
  const { isOpen, setIsOpen } = useContext<any>(UploadModalContext);
  const [uploadState, setUploadState] = useState<null | RequestState>(null);

  function closeModal() {
    if (uploadState?.status === 'loading') return;
    setIsOpen(false);
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

      await fetchUploadCaseFile(formData, caseId);
      setUploadState({ status: 'ok', message: 'Arquivo adicionado com sucesso!' });
      setUpdateFiles(true);
    } catch (error) {
      setUploadState({ status: 'error', message: 'Arquivo não adicionado' });
      console.log(error);
    }
  }

  async function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    try {
      const fileItems = [...e.dataTransfer.items].map((item) => item.getAsFile());
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

      await fetchUploadCaseFile(formData, caseId);

      setUploadState({ status: 'ok', message: 'Arquivo adicionado com sucesso!' });
      setUpdateFiles(true);
    } catch (error) {
      console.log(error);
      setUploadState({ status: 'error', message: 'Arquivo não adicionado' });
    }
  }

  return (
    isOpen && (
      <div className="absolute z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[360px] h-[320px] rounded-lg overflow-hidden shadow-[0px_0px__3px_black]">
        <PrimaryModalWindow
          closeModal={() => {
            closeModal();
          }}
        >
          <div className="size-full flex flex-col text-center items-center justify-end p-[4px]">
            {(uploadState?.status === 'ok' || uploadState?.status === 'error') && (
              <p
                className={`font-bold mb-[16px] fade-in-animation ${
                  uploadState?.status === 'ok' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {uploadState.message}
              </p>
            )}
            <DropArea
              uploadState={uploadState}
              handleChange={handleChange}
              handleDrop={handleDrop}
            />
          </div>
        </PrimaryModalWindow>
      </div>
    )
  );
}
