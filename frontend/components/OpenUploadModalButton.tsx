'use client';

import { Button } from './Button';
import { useContext } from 'react';
import { UploadModalContext } from '@/contexts/modals/UploadModalContext';
import { ModalContextType } from '@/contexts/modals/ModalContextType';
import { MissingContextError } from '@/errors/MissingContextError';

interface Props {
  disabled?: boolean;
}
export function OpenUploadModalButton({ disabled }: Props) {
  const context = useContext<ModalContextType | undefined>(UploadModalContext);

  if (!context) {
    throw new MissingContextError('UploadModalContext');
  }
  const { setIsOpen } = context;

  function handleClick() {
    setIsOpen!(true);
  }

  return (
    <div className="size-[48px] min-md:h-[48px] min-md:w-[200px]">
      <Button height="100%" width="100%" onclick={handleClick} disabled={disabled}>
        <span className="flex justify-center items-center size-full md:hidden">
          <img src="/icons/upload.svg" alt="" />
        </span>
        <span className="hidden md:block">Adicionar Documento</span>
      </Button>
    </div>
  );
}
