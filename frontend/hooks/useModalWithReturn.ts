import { PreviousModal } from '@/contexts/modals/ModalContext';
import { useModal } from './useModal';
import { ModalType } from '@/types/ModalType';

export function useModalWithReturn<T>(previousModal: PreviousModal<T>) {
  const { openModal } = useModal();
  return (type: ModalType, payload: unknown) => {
    return openModal(type, payload, previousModal);
  };
}
