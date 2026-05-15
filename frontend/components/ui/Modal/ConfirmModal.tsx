'use case';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from './PrimaryModal';
import { Button } from '../Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../Feedback/RequestFeedback';

interface Props {
  data: { onConfirm: () => void };
  close: () => void;
}

export function ConfirmModal({ data, close }: Props) {
  const { onConfirm } = data;
  return (
    <PrimaryModal
      additionalStyles={
        'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[400px] h-[240px]'
      }
      closeModal={close}
    >
      <div className="flex flex-col size-full justify-between items-center p-[24px]">
        <div className="flex h-fit justify-between items-end size-full ">
          <Button
            className="w-[144px] h-[56px] bg-color-white text-color-black"
            onclick={() => {
              close();
            }}
          >
            Cancelar
          </Button>
          <Button
            className="w-[144px] h-[56px] bg-color-white text-color-black"
            onclick={() => {
              onConfirm();
              close();
            }}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </PrimaryModal>
  );
}
