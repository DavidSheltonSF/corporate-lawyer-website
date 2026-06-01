'use case';
import { PropsWithChildren } from 'react';
import { BaseModal } from '../Modal/BaseModal';

interface Props {
  title?: string;
  formId: string;
  confirmDisabled?: boolean;
  close: () => void;
}

export function FormModal({ title, formId, close, confirmDisabled, children }: PropsWithChildren<Props>) {
  return (
    <BaseModal
      title={title}
      formId={formId}
      className={'h-fit w-[90%] min-md:w-[60%] min-lg:w-[680px]'}
      confirmDisabled={confirmDisabled}
      onClose={close}
    >
      <div className="flex flex-col h-[500px] min-lg:h-fit overflow-visible">{children}</div>
    </BaseModal>
  );
}
