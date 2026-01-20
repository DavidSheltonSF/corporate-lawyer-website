'use client';

import { Button } from './Button';
import { useContext } from 'react';
import { UploadModalContext } from '@/contexts/modals/UploadModalContext';
import { ModalContextType } from '@/contexts/modals/ModalContextType';
import { MissingContextError } from '@/errors/MissingContextError';

export function OpenUploadModalButton() {
  const context = useContext<ModalContextType | undefined>(UploadModalContext);

  if (!context) {
    throw new MissingContextError('UploadModalContext');
  }
  const { setIsOpen } = context;

  function handleClick() {
    setIsOpen!(true);
  }

  return (
    <div>
      <Button onclick={handleClick}>Adicionar Documento</Button>
    </div>
  );
}
