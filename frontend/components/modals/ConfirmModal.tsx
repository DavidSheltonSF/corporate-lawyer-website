'use case';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { Button } from '../Button';
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
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[400px] h-[224px] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full justify-center items-around">
          <div className="flex w-full h-[80px] justify-center items-center">
            {requestState === null ? <h2 className="text-center text-lg">{text}</h2> : ''}
            <RequestFeedback requestState={requestState} />
          </div>
          <div className="flex h-fit bg-color-white justify-around items-end size-full  p-[16px] ">
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
      </PrimaryModalWindow>
    )
  );
}
