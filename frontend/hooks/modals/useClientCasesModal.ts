import { useModalStore } from '@/stores/useModalStore';

export function useClientCasesModal() {
  const { openModal } = useModalStore();
  function openClientCasesModal(clientId: string) {
    openModal({ type: 'client-cases', payload: { clientId } });
  }

  return { openClientCasesModal };
}
