import { WithId } from '@/types/WithId';
import { FieldValue } from './FieldValue';
import { SafeUser } from '@/types/SafeUser';
import { VerticalMoreIcon } from './icons/VerticalMoreIcon';
import { useContext } from 'react';
import { MissingContextError } from '@/errors/MissingContextError';
import { ClientCardOptionsModalContext } from '@/contexts/modals/ClientCardOptionsModalContext';

interface Props {
  clientData: WithId<SafeUser>;
  openClientModal: (clientId: string) => void;
}

export function ClientCard({ clientData, openClientModal }: Props) {
  const { id, firstName, lastName, email, cpf } = clientData;

  const clientCardOptionsModalContext = useContext(ClientCardOptionsModalContext);
  if (!clientCardOptionsModalContext) {
    throw new MissingContextError(ClientCardOptionsModalContext.name);
  }

  const { setIsOpen, setSelectedClient } = clientCardOptionsModalContext;

  return (
    <article className="flex flex-col fade-in-animation  bg-color-primary w-full min-md:w-[80%] min-lg:w-[640px] min-h-[280px] h-max rounded-xl">
      <header className="flex items-center justify-between w-full p-[16px] min-md:p-[24px]">
        <h1 className="h-fit font-bold text-center min-md:text-start text-xl min-md:text-3xl">
          {`${firstName} ${lastName}`}
        </h1>
        <button
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setSelectedClient({
              id,
              firstName,
              lastName,
            });
          }}
        >
          <VerticalMoreIcon color="var(--white-color)" height="32px" width="32px" />
        </button>
      </header>
      <main
        onClick={() => {
          openClientModal(id);
        }}
        className="flex flex-1 flex-col gap-[16px] px-[24px] py-[16px] bg-color-white text-color-black text-lg cursor-pointer"
        style={{
          borderRadius: 'inherit',
        }}
      >
        <FieldValue field="Nome" value={firstName} />
        <FieldValue field="Sobrenome" value={lastName} />
        <FieldValue field="Email" value={email} />
        <FieldValue field="CPF" value={cpf} />
      </main>
    </article>
  );
}
