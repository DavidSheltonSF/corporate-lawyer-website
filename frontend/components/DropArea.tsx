'use client';

import { useEffect, useRef } from 'react';
import { UploadCloudIcon } from './UploadCloudIcon';
import { RequestState } from '@/types/RequestState';

interface Props {
  uploadState: RequestState | null;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleDrop: React.DragEventHandler<HTMLLabelElement>;
}

export function DropArea({ uploadState, handleChange, handleDrop }: Props) {
  const dropAreaRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const handleGlobalDragOver = (e: any) => {
      const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file');

      if (fileItems.length > 0) {
        e.preventDefault();
        const dropArea = dropAreaRef.current;

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

  function handleDragOver(e: React.DragEvent) {
    const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file');

    if (fileItems.length > 0) {
      e.preventDefault();
      const dropArea = e.currentTarget;
      if (fileItems.some((item) => item.type === 'application/pdf')) {
        e.dataTransfer.dropEffect === 'copy';
        dropArea.classList.add('border-[2px]', 'border-blue-400');
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

  return (
    <label
      htmlFor="input-file"
      ref={dropAreaRef}
      className={`flex flex-col items-center justify-center gap-[6px] bg-gray-300 h-[70%] w-[85%] rounded-md p-[4px] mb-[24px] cursor-pointer ${
        uploadState?.status === 'loading' && 'animate-pulse border-[2px] border-blue-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCloudIcon width="56px" height="56px" color="#2c2c2c85" />
      <h1 className="text-lg ">Solte Seu Arquivo Aqui</h1>
      <h1 className="text-lg ">- ou -</h1>
      <h1 className="text-lg ">Clique para fazer upload</h1>

      <input
        className="hidden"
        id="input-file"
        type="file"
        onChange={handleChange}
        accept="application/pdf"
      />
    </label>
  );
}
