import { useModalStore } from '@/stores/useModalStore';
import { UserSlice } from '@/types/UserSlice';
import { WithId } from '@/types/WithId';

export function useDeleteClientModal() {
  const { openModal } = useModalStore();
  function openDeleteClientModal(clientSlice: WithId<UserSlice>, refetchClients: () => void) {
    openModal({ type: 'delete-client', payload: { clientSlice, refetchClients } });
  }

  return { openDeleteClientModal };
}
