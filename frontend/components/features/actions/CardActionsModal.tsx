'use client';
import { PrimaryModal } from '../../ui/Modal/PrimaryModal';
import { Dispatch, SetStateAction } from 'react';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { ActionButton } from './ActionButton';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openDeleteModal: Function;
  openUpdateModal: Function;
}

export function CardActionsModal({ openDeleteModal, openUpdateModal, isOpen, setIsOpen }: Props) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    isOpen && (
      <PrimaryModal
        additionalStyles="fixed z-99999999999 top-[15%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[400px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
        closeModal={() => {
          closeModal();
        }}
      >
        <div className="size-full flex flex-col text-center items-center justify-center gap-[8px] p-[8px]">
          <div className="flex flex-col w-full justify-around">
            <ActionButton
              Icon={EditIcon}
              handleClick={() => {
                openUpdateModal();
                closeModal();
              }}
            />
            <ActionButton
              Icon={DeleteIcon}
              handleClick={() => {
                openUpdateModal();
                closeModal();
              }}
            />
          </div>
        </div>
      </PrimaryModal>
    )
  );
}
