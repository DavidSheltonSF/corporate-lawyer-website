import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { CreateDeadlineModalForm } from './CreateDeadlineModalForm';

interface Props {
  caseId: string;
  close: () => void;
}

CreateDeadlineModal.Form = CreateDeadlineModalForm;
export function CreateDeadlineModal({ caseId, close }: Props) {
  const formId = 'create-deadline';

  return (
    <BaseModal
      className="w-[90%] min-md:w-[60%] min-lg:w-fit"
      formId="create-deadline"
      title="Criar novo prazo"
      onClose={close}
    >
      <div className="h-fit p-[24px] overflow-y-auto min-lg:overflow-visible">
        <CreateDeadlineModal.Form formId={formId} caseId={caseId} />
      </div>
    </BaseModal>
  );
}
