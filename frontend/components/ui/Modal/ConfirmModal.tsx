'use case';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { ButtonVariant } from '../Button/ButtonVariant';
import { BaseModal } from './BaseModal';

export interface ConfirmModalProps {
  title?: string;
  message: string;
  confirmButtonVariant?: ButtonVariant;
  onConfirm: () => void;
}

export function ConfirmModal({ payload, close }: GlobalModalProps<ConfirmModalProps>) {
  const { title, message, onConfirm, confirmButtonVariant } = payload;
  return (
    <BaseModal
      confirmButtonVariant={confirmButtonVariant}
      title={title}
      onConfirm={() => {
        onConfirm();
        close();
      }}
      className={'w-[90%] min-md:w-[60%] min-lg:w-[400px] h-fit'}
      onClose={close}
    >
      <div className="flex flex-col size-full px-[24px] p-[24px] text-sm">
        <h3>{message}</h3>
      </div>
    </BaseModal>
  );
}
