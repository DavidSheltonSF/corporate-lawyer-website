'use client';
import { BaseModal } from '../ui/Modal/BaseModal';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { UpdateClientModalForm } from './UpdateClientModalForm';

interface Props {
  clientId: string;
  loadClients: () => void;
}

UpdateClientModal.Form = UpdateClientModalForm;

export function UpdateClientModal({ payload, close }: GlobalModalProps<Props>) {
  const { clientId } = payload;

  const formId = 'update-client-form';
  return (
    <BaseModal
      formId={formId}
      title="Editar cliente"
      className={
        'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-fit'
      }
      onClose={close}
    >
      <UpdateClientModal.Form clientId={clientId} formId={formId} />
    </BaseModal>
  );
}
