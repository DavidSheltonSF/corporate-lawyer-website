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

      console.log('File send to the api');

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
            <div
              className={`flex flex-col items-center justify-around bg-gray-200 h-[80%] w-[90%] rounded-md p-[8px] border border-dashed ${
                uploadState?.status === 'loading' && 'animate-pulse border-blue-400 border-[2px]'
              }`}
            >
              <h1 className="text-2xl ">Arraste e Largue o arquivo</h1>

              <UploadCloudIcon width="56px" height="56px" color="#2c2c2c85" />

              <label
                className="py-[8px] px-[16px] bg-color-primary hover:brightness-130 text-color-white rounded-md cursor-pointer"
                htmlFor="input-file"
              >
                Escolher Arquivo
                <input className="hidden" id="input-file" type="file" onChange={handleChange} />
              </label>
            </div>
          </div>
        </PrimaryModalWindow>
      </div>
    )
  );
}
