import { useModalStore } from '@/stores/useModalStore';

export function useCreateDeadlineModal() {
  const { openModal } = useModalStore();
  function openCreateDeadlineModal(caseId: string) {
    openModal({ type: 'create-deadline', payload: { caseId } });
  }

  return { openCreateDeadlineModal };
}
