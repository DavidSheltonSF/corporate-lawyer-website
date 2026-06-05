import { ConfirmModalProps } from '@/components/ui/Modal/ConfirmModal';
import { useModalStore } from '@/stores/useModalStore';

export function useConfirmModal() {
  const { openModal } = useModalStore();
  function openConfirmModal(confirmModalProps: ConfirmModalProps) {
    openModal({ type: 'confirm', payload: confirmModalProps });
  }
  return { openConfirmModal };
}
