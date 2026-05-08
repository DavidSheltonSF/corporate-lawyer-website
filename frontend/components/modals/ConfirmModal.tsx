'use case';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from './PrimaryModal';
import { Button } from '../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';

interface Props {
  onConfirm: Function;
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  requestState: RequestState | null;
}

export function ConfirmModal({ isOpen, setIsOpen, onConfirm, requestState, text }: Props) {
  return (
    isOpen && (
      <PrimaryModal
        additionalStyles={
          'fixed z-99999999999 top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[400px] h-[240px] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full justify-between items-center p-[24px]">
          <div className="flex w-full h-[80px] justify-center items-center">
            {requestState === null ? <h3 className="text-center text-lg">{text}</h3> : ''}
            <RequestFeedback requestState={requestState} />
          </div>
          <div className="flex h-fit justify-between items-end size-full ">
            <Button
              width="144px"
              height="56px"
              backgroundColor="#949494"
              textColor="black"
              fontSize="1.2rem"
              onclick={() => {
                setIsOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              width="144px"
              height="56px"
              backgroundColor="var(--primary-color)"
              textColor="var(--white-color)"
              fontSize="1.2rem"
              onclick={() => onConfirm()}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </PrimaryModal>
    )
  );
}
