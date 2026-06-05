import { useModalStore } from '@/stores/useModalStore';

export function useCreateDeadlineModal() {
  const { openModal } = useModalStore();
  function openCreateDeadlineModal(caseId: string, refetchDeadlines: () => void) {
    openModal({ type: 'create-deadline', payload: { caseId, refetchDeadlines } });
  }

  return { openCreateDeadlineModal };
}
