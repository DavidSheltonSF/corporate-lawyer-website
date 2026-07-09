import { useModalStore } from '@/stores/useModalStore';

export function useCaseModal() {
  const { openModal } = useModalStore();
  function openCaseModal(caseId: string) {
    openModal({ modal: { type: 'case', payload: { caseId } } });
  }

  return { openCaseModal };
}

