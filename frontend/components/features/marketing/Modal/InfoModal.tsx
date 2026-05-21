'use client';
import { Button } from '@/components/ui/Button/Button';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { ReactNode } from 'react';

interface Props {
  closeModal: Function;
  children: ReactNode;
}

export function InfoModal({ closeModal, children }: Props) {
  return (
    <div className={`flex relative flex-col size-[100%] font-bold p-[16px]`}>
      <div>{children}</div>

      <Button className="min-lg:w-fit min-lg:ml-auto" variant={ButtonVariant.SECONDARY} onClick={() => closeModal()}>
        Ok
      </Button>
    </div>
  );
}
