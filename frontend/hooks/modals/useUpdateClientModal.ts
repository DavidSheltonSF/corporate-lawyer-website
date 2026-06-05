import { useModalStore } from '@/stores/useModalStore';

export function useUpdateClientModal() {
  const { openModal } = useModalStore();
  function openUpdateClientModal(clientId: string, refetchClients: () => void) {
    openModal({ type: 'update-client', payload: { clientId, refetchClients } });
  }

  return { openUpdateClientModal };
}
