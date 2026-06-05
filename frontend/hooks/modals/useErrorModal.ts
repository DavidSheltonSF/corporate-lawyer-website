import { useModalStore } from '@/stores/useModalStore';

export function useErrorModal() {
  const { openModal } = useModalStore();
  function openErrorModal(message: string) {
    openModal({ type: 'error', payload: { message } });
  }

  return { openErrorModal };
}
