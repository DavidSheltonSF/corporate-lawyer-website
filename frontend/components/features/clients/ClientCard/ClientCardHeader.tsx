import { UserIcon } from '@/components/icons/UserIcon';
import { Text } from '@/components/ui/Text';

interface Props {
  clientName: string;
  cpf: string;
}

export function ClientCardHeader({ clientName, cpf }: Props) {
  return (
    <header className="flex flex-col  gap-[8px] ">
      <div className="flex items-center gap-[32px]">
        <div className="flex justify-center items-center size-[5rem] border rounded-[8px]">
          <UserIcon className="size-[40px]" />
        </div>
        <Text as={'h2'} variant="h2">
          {clientName}
        </Text>
      </div>
      <div>
        <Text variant="muted">CPF: {cpf}</Text>
      </div>
    </header>
  );
}
