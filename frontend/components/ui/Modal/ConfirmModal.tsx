'use case';
import { ButtonVariant } from '../Button/ButtonVariant';
import { PrimaryModal } from './PrimaryModal';

interface Props {
  data: { title?: string; message: string; confirmButtonVariant?: ButtonVariant; onConfirm: () => void };
  close: () => void;
}

export function ConfirmModal({ data, close }: Props) {
  const { title, message, onConfirm, confirmButtonVariant = ButtonVariant.DEFAULT } = data;
  return (
    <PrimaryModal
      confirmButtonVariant={confirmButtonVariant}
      title={title}
      onConfirm={onConfirm}
      className={
        'min-lg:w-[400px] h-fit'
      }
      onClose={close}
    >
      <div className="flex flex-col size-full px-[24px] p-[24px] text-sm">
        <h3>{message}</h3>
      </div>
    </PrimaryModal>
  );
}
