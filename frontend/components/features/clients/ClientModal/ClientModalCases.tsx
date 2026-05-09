import { reduceString } from '@/lib/reduceString';
import { Case } from '@/types/Case';
import { Button } from '../../../ui/Button/Button';

interface Props {
  cases: Case[];
  openRegisterCaseModal: () => void;
}

export function ClientModalCases({ cases, openRegisterCaseModal }: Props) {
  const renderClientCases = cases.map((cas, index) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-[8px] w-full border-[1px] p-[8px] rounded-[8px]"
      >
        <h2 className="font-bold ">{reduceString(cas.title, 24)}</h2>
        <div className="flex flex-col">{reduceString(cas.description || '', 70)}</div>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-[8px] border-b border-black/50">
      <div className="relative w-full bg-color-primary p-[16px]">
        <h1 className="text-2xl font-bold text-color-white">Processos</h1>
        <div className="absolute right-[16px] top-[50%] translate-y-[-50%]">
          <Button darkHover onclick={() => openRegisterCaseModal()}>Adicionar Processo</Button>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] p-[24px] h-[224px] min-lg:h-[316px] overflow-auto">
        {renderClientCases}
      </div>
    </div>
  );
}
