import { useModalStore } from '@/stores/useModalStore';

export function useUpdateClientModal() {
  const { openModal } = useModalStore();
  function openUpdateClientModal(
    clientId: string,
    onUpdate: (clientId: string, data: Record<string, string>) => void
  ) {
    openModal({
      modal: { type: 'update-client', payload: { clientId, onUpdate } },
    });
  }

  return { openUpdateClientModal };
}
