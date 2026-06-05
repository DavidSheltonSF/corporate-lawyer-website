import { useModalStore } from '@/stores/useModalStore';
import { UserSlice } from '@/types/UserSlice';
import { WithId } from '@/types/WithId';

export function useDeleteClientModal() {
  const { openModal } = useModalStore();
  function openDeleteClientModal(clientSlice: WithId<UserSlice>) {
    openModal({ type: 'delete-client', payload: { clientSlice } });
  }

  return { openDeleteClientModal };
}
