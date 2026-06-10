import { FieldValue } from "@/components/FieldValue";
import { Text } from "@/components/ui/Text";

interface Props {
  firstName: string;
  lastName: string;
  cpf: string;
}

export function ClientModalHeader({ firstName, lastName, cpf }: Props) {
  return (
    <header className="flex flex-col gap-[8px] w-full p-[24px] border-divider">
      <Text as={'h1'} variant="h1" className="text-3xl font-bold ">
        {firstName} {lastName}
      </Text>
      <div className="flex flex-1">
        <Text variant="muted" className="text-muted">CPF {cpf}</Text>
      </div>
    </header>
  );
}
