import { useModalStore } from '@/stores/useModalStore';

export function useSuccessModal() {
  const { openModal } = useModalStore();
  function openSuccessModal(message: string, replace: boolean) {
    openModal({
      modal: { type: 'success', payload: { message } },
      replace
    });
  }

  return { openSuccessModal };
}
