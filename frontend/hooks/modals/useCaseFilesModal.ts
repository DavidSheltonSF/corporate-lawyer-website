import { useModalStore } from '@/stores/useModalStore';

export function useCaseFilesModal() {
  const { openModal } = useModalStore();
  function openCaseFilesModal(caseId: string) {
    openModal({ type: 'case-files', payload: { caseId } });
  }

  return { openCaseFilesModal };
}
