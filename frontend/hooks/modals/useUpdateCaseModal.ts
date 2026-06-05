import { useModalStore } from '@/stores/useModalStore';

export function useUpdateCaseModal() {
  const { openModal } = useModalStore();
  function openUpdateCaseModal(caseId: string, refetchCases: () => void) {
    openModal({ type: 'update-case', payload: { caseId, refetchCases } });
  }

  return { openUpdateCaseModal };
}
