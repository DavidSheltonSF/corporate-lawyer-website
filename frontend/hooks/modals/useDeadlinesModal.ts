import { useModalStore } from '@/stores/useModalStore';

export function useDeadlinesModal() {
  const { openModal } = useModalStore();
  function openDeadlinesModal(caseId: string) {
    openModal({ type: 'deadlines', payload: { caseId } });
  }

  return { openDeadlinesModal };
}
