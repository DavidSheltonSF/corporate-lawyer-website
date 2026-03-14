import { WithId } from '@/types/WithId';
import { FieldValue } from './FieldValue';
import { SafeUser } from '@/types/SafeUser';
import { VerticalMoreIcon } from './icons/VerticalMoreIcon';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  clientData: WithId<SafeUser>;
  optionsModalIsOpen: boolean;
  setOptionsModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ClientCard({ clientData, optionsModalIsOpen, setOptionsModalIsOpen }: Props) {
  const { id, firstName, lastName, email, cpf, role } = clientData;

  // const userModalContext = useCaseModalContext();

  // if (!userModalContext) {
  //   throw new MissingContextError('CaseModalContext');
  // }

  //const { setIsOpen, setCaseId } = userModalContext;

  return (
    <article
      onClick={() => {
        // setUserId(id);
        // setIsOpen(true);
      }}
      className="flex flex-col fade-in-animation  bg-color-primary w-full min-md:w-[80%] min-lg:w-[640px] min-h-[280px] h-max rounded-xl cursor-pointer"
    >
      <header className="flex items-center justify-between w-full p-[16px] min-md:p-[24px]">
        <h1 className="h-fit font-bold text-center min-md:text-start text-xl min-md:text-3xl">
          {`${firstName} ${lastName}`}
        </h1>
        <button onClick={() => setOptionsModalIsOpen(true)}>
          <VerticalMoreIcon color="var(--white-color)" height="32px" width="32px" />
        </button>
      </header>
      <main
        className="flex flex-1 flex-col gap-[16px] px-[24px] py-[16px] bg-color-white text-color-black text-lg"
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
