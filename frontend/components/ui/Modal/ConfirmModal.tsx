'use case';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from './PrimaryModal';
import { Button } from '../Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../Feedback/RequestFeedback';

interface Props {
  data: { title?: string; message: string; onConfirm: () => void };
  close: () => void;
}

export function ConfirmModal({ data, close }: Props) {
  const { title, message, onConfirm } = data;
  return (
    <PrimaryModal
      title={title}
      className={
        'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[400px] h-fit'
      }
      onClose={close}
    >
      <div className="flex flex-col size-full px-[24px] pb-[24px]">
        <div className="flex my-[24px] h-full text-center">
          <h2>{message}</h2>
        </div>
        <div className="flex h-fit justify-between items-end w-full ">
          <Button
            className="w-[144px] h-[56px] bg-color-white text-color-black font-bold border border-black hover:brightness-95"
            onClick={() => {
              close();
            }}
          >
            Cancelar
          </Button>
          <Button
            className="w-[144px] h-[56px] bg-color-red text-color-white font-bold"
            onClick={() => {
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
