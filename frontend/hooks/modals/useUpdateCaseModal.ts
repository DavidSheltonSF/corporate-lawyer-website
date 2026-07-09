import { useModalStore } from '@/stores/useModalStore';

export function useUpdateCaseModal() {
  const { openModal } = useModalStore();
  function openUpdateCaseModal(caseId: string, onSubmit: (caseId: string, data: Record<string, string>) => any
) {
    openModal({
      modal: { type: 'update-case', payload: { caseId, onSubmit } },
    });
  }

  return { openUpdateCaseModal };
}
