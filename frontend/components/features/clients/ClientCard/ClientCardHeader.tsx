import { UserIcon } from '@/components/icons/UserIcon';

interface Props {
  clientName: string;
  cpf: string;
}

export function ClientCardHeader({ clientName, cpf }: Props) {
  return (
    <header className="flex flex-col  gap-[8px] ">
      <div className="flex items-center gap-[32px]">
        <div className="flex justify-center items-center size-[5rem] border rounded-[8px]">
          <UserIcon width="40px" height="40px" />
        </div>
        <h2>{clientName}</h2>
      </div>
      <div>
        <span className='text-muted'>CPF: {cpf}</span>
      </div>
    </header>
  );
}
