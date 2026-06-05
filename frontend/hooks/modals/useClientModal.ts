import { useModalStore } from '@/stores/useModalStore';

export function useClientModal() {
  const { openModal } = useModalStore();
  function openClientModal(clientId: string) {
    openModal({ type: 'client', payload: { clientId } });
  }

  return { openClientModal };
}
