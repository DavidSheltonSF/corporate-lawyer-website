'use case';
import { UpdateCaseModalForm } from './UpdateCaseModalForm';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { FormModal } from '@/components/ui/FormModal/FormModal';

interface Props {
  caseId: string;
  refetchCases: () => void;
}

UpdateCaseModal.Form = UpdateCaseModalForm;

export function UpdateCaseModal({ payload, close }: GlobalModalProps<Props>) {
  const { caseId, refetchCases } = payload;
  const formId = 'update-case-form';

  return (
    <FormModal title="Alterar processo" formId={formId} onClose={close}>
      <UpdateCaseModal.Form formId={formId} caseId={caseId} refetchCases={refetchCases} />
    </FormModal>
  );
}
