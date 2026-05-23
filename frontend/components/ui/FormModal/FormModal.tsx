'use case';
import { PropsWithChildren } from 'react';
import { BaseModal } from '../Modal/BaseModal';

interface Props {
  title?: string;
  formId: string;
  close: () => void;
}

export function FormModal({ title, formId, close, children }: PropsWithChildren<Props>) {
  return (
    <BaseModal
      title={title}
      formId={formId}
      className={'h-[70vh] min-lg:h-fit w-[90%] min-md:w-[60%] min-lg:w-[680px]'}
      onClose={close}
    >
      <div className="flex flex-col h-[500px] min-lg:h-fit p-[24px] overflow-visible">
        {children}
      </div>
    </BaseModal>
  );
}
