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
      onConfirm={onConfirm}
      className={
        'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[400px] h-fit'
      }
      onClose={close}
    >
      <div className="flex flex-col size-full px-[24px] p-[24px] text-sm">
        <h3>{message}</h3>
      </div>
    </PrimaryModal>
  );
}
