import { useModalStore } from '@/stores/useModalStore';
import { UserSlice } from '@/types/UserSlice';
import { WithId } from '@/types/WithId';

export function useDeleteClientModal() {
  const { openModal } = useModalStore();
  function openDeleteClientModal(clientSlice: WithId<UserSlice>, onDelete: (clientId: string) => void) {
    openModal({ type: 'delete-client', payload: { clientSlice, onDelete } });
  }

  return { openDeleteClientModal };
}
