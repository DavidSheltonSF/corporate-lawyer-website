import { FieldValue } from '@/components/FieldValue';
import { Case } from '@/types/Case';
import { SafeUser } from '@/types/SafeUser';

interface Props {
  clientData: (SafeUser & { cases: Case[] }) | null;
}

export function ClientModalInfo({ clientData }: Props) {
  return (
    <div className="flex flex-col w-full text-lg min-lg:text-xl">
      <div className="flex flex-col gap-[8px] border-b border-black/50 p-[16px]">
        <FieldValue field="Nomeº:" value={clientData?.firstName || ''} />
        <FieldValue field="Sobrenome:" value={clientData?.lastName || ''} />
        <FieldValue field="Email:" value={clientData?.email || ''} />
        <FieldValue field="CPF:" value={clientData?.cpf || ''} />
      </div>
    </div>
  );
}
