'use client';

import { UploadModalContext } from '@/contexts/modals/UploadModalContext';
import { useContext, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { fetchUploadCaseFile } from '@/services/fetchUploadCaseFile';
import { UploadIcon } from './UploadIcon';

export function UploadModal({ caseId }: { caseId: string }) {
  const { isOpen, setIsOpen } = useContext<any>(UploadModalContext);
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      console.log('File send to the api');

      const formData = new FormData();

      formData.append('file', file);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await fetchUploadCaseFile(formData, caseId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    isOpen && (
      <div className="absolute z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[400px] h-[300px] rounded-lg overflow-hidden shadow-xl">
        <PrimaryModalWindow closeModal={() => setIsOpen(false)}>
          <div className="size-full flex justify-center items-center">
            <div
              className={`flex flex-col items-center justify-around bg-gray-200 h-[80%] w-[90%] rounded-md p-[8px] border border-dashed ${
                loading && 'animate-pulse border-blue-400 border-[2px]'
              }`}
            >
              <h1 className="text-2xl ">Arraste e Largue o arquivo</h1>

              <UploadIcon width="56px" height="56px" color="#2c2c2c85" />

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
