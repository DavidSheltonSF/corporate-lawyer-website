'use case';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { BaseModal } from './BaseModal';

interface Props {
  message: string;
}

export function ErrorModal({ payload, close }: GlobalModalProps<Props>) {
  const { message } = payload;
  return (
    <BaseModal
      title={'Erro'}
      className={'w-[90%] min-md:w-[60%] min-lg:w-[400px] h-fit'}
      closeText="Ok"
      onClose={close}
    >
      <div className="flex justify-center items-center text-center size-full px-[24px] p-[24px] text-sm">
        <h3>{message}</h3>
      </div>
    </BaseModal>
  );
}
