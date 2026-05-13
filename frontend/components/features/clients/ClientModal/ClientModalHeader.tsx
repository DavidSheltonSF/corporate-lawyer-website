import { FieldValue } from "@/components/FieldValue";

interface Props {
  firstName: string;
  lastName: string;
  cpf: string;
}

export function ClientModalHeader({ firstName, lastName, cpf }: Props) {
  return (
    <header className="flex flex-col gap-[8px] w-full p-[24px] border-divider">
      <h1 className="text-3xl font-bold ">
        {firstName} {lastName}
      </h1>
      <div className="flex flex-1">
       <span className="text-muted">CPF {cpf}</span>
      </div>
    </header>
  );
}
