import { RenameFileModalPayload } from '@/components/features/files/RenameFileModal/RenameFileModal';
import { useModalStore } from '@/stores/useModalStore';

export function useRenameFileModal() {
  const { openModal } = useModalStore();

  function openRenameFileModal(payload: RenameFileModalPayload) {
    openModal({ type: 'rename-file', payload });
  }

  return { openRenameFileModal };
}
