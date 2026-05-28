import { ModalType, PreviousModal } from '@/contexts/modals/ModalContext';
import { useModal } from './useModal';

export function useModalWithReturn<T>(previousModal: PreviousModal<T>) {
  const { openModal } = useModal();
  return (type: ModalType, payload: unknown) => {
    return openModal(type, payload, previousModal);
  };
}
