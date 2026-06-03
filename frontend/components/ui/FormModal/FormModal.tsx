'use case';
import { PropsWithChildren } from 'react';
import { BaseModal } from '../Modal/BaseModal';

interface Props {
  title?: string;
  formId: string;
  confirmDisabled?: boolean;
  onClose: () => void;
}

export function FormModal({
  title,
  formId,
  onClose,
  confirmDisabled,
  children,
}: PropsWithChildren<Props>) {
  return (
    <BaseModal
      title={title}
      formId={formId}
      className={'h-fit w-[90%] min-md:w-[60%] min-lg:w-[680px]'}
      confirmDisabled={confirmDisabled}
      onClose={onClose}
    >
      <div className="flex flex-col h-[520px] min-lg:h-fit overflow-visible">
        <div className="flex flex-col overflow-y-auto p-[24px] h-fit">{children}</div>
      </div>
    </BaseModal>
  );
}
