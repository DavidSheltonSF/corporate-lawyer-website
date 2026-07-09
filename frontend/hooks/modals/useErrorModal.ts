import { useModalStore } from '@/stores/useModalStore';

export function useErrorModal() {
  const { openModal } = useModalStore();
  function openErrorModal(message: string) {
    openModal({
      modal: { type: 'error', payload: { message } },
    });
  }

  return { openErrorModal };
}
