import { OpenModalConfig, useModalStore } from '@/stores/useModalStore';

export function useSuccessModal() {
  const { openModal } = useModalStore();
  function openSuccessModal(message: string, config?: OpenModalConfig) {
    openModal({
      modal: { type: 'success', payload: { message } },
      config
    });
  }

  return { openSuccessModal };
}
