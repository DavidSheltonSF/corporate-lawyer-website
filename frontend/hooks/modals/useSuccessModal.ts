import { useModalStore } from '@/stores/useModalStore';

export function useSuccessModal() {
  const { openModal } = useModalStore();
  function openSuccessModal(message: string) {
    openModal({ type: 'success', payload: { message } });
  }

  return { openSuccessModal };
}
