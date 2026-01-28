'use client';
import { UploadModalContext } from '@/contexts/modals/UploadModalContext';
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { fetchUploadCaseFile } from '@/services/fetchUploadCaseFile';
import { RequestState } from '@/types/RequestState';
import { UploadCloudIcon } from '../UploadCloudIcon';

export function UploadModal({
  caseId,
  setUpdateFiles,
}: {
  caseId: string;
  setUpdateFiles: Dispatch<SetStateAction<boolean>>;
}) {
  const { isOpen, setIsOpen } = useContext<any>(UploadModalContext);
  const [uploadState, setUploadState] = useState<null | RequestState>(null);

  useEffect(() => {
    const handleGlobalDragOver = (e: any) => {
      const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file');

      if (fileItems.length > 0) {
        e.preventDefault();
        const dropArea = document.querySelector('.dropArea');

        if (!dropArea?.contains(e.target)) {
          e.dataTransfer.dropEffect = 'none';
        }
      }
    };
    const handleGlobalDrop = (e: any) => {
      if ([...e.dataTransfer.items].some((item) => item.kind === 'file')) {
        e.preventDefault();
      }
    };

    window.addEventListener('dragover', handleGlobalDragOver);
    window.addEventListener('drop', handleGlobalDrop);

    () => {
      window.removeEventListener('dragover', handleGlobalDragOver);
      window.removeEventListener('drop', handleGlobalDrop);
    };
  });

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

  function handleDragOver(e: React.DragEvent) {
    const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file');

    if (fileItems.length > 0) {
      e.preventDefault();
      const dropArea = e.currentTarget;
      dropArea.classList.add('border-[2px]', 'border-blue-400');

      if (fileItems.some((item) => item.type === 'application/pdf')) {
        e.dataTransfer.dropEffect === 'copy';
      } else {
        e.dataTransfer.dropEffect === 'none';
      }
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const dropArea = e.currentTarget;
    dropArea.classList.remove('border-[2px]', 'border-blue-400');
  }

  async function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    try {
      e.preventDefault();
      const fileItems = [...e.dataTransfer.items].map((item) => item.getAsFile());

      if (!fileItems[0]) return;

      setUploadState({ status: 'loading' });

      const formData = new FormData();
      formData.append('file', fileItems[0]);

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
      <div className="absolute z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[350px] h-[300px] rounded-lg overflow-hidden shadow-[0px_0px__3px_black]">
        <PrimaryModalWindow
          closeModal={() => {
            closeModal();
          }}
        >
          <div className="size-full flex flex-col justify-center items-center">
            {(uploadState?.status === 'ok' || uploadState?.status === 'error') && (
              <p
                className={`font-bold ${
                  uploadState?.status === 'ok' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {uploadState.message}
              </p>
            )}
            <label
              htmlFor="input-file"
              className={`dropArea flex flex-col items-center justify-around bg-gray-200 h-[80%] w-[90%] rounded-md p-[8px] border border-dashed ${
                uploadState?.status === 'loading' && 'animate-pulse border-blue-400 border-[2px]'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <h1 className="text-2xl ">Arraste e Largue o arquivo</h1>

              <UploadCloudIcon width="56px" height="56px" color="#2c2c2c85" />

              <div className="py-[8px] px-[16px] bg-color-primary hover:brightness-130 text-color-white rounded-md cursor-pointer">
                Escolher Arquivo
                <input
                  className="hidden"
                  id="input-file"
                  type="file"
                  onChange={handleChange}
                  accept="application/pdf"
                />
              </div>
            </label>
          </div>
        </PrimaryModalWindow>
      </div>
    )
  );
}
