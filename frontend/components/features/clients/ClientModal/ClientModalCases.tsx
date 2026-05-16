import { reduceString } from '@/lib/reduceString';
import { Case } from '@/types/Case';
import { Button } from '../../../ui/Button/Button';
import { AddIcon } from '@/components/icons/AddIcon';
import { WithId } from '@/types/WithId';
import { Card } from '@/components/ui/Card/Card';
import { ClientCaseCard } from './ClientCaseCard';

interface Props {
  cases: WithId<Case>[];
  openRegisterCaseModal: () => void;
}

export function ClientModalCases({ cases, openRegisterCaseModal }: Props) {
  const renderClientCases = cases.map((cas, index) => {
    return <ClientCaseCard key={cas.id} caseData={cas} />;
  });

  return (
    <div className="flex flex-col gap-[24px] p-[24px]">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Processos</h1>
        <Button className="flex justify-center gap-[8px] px-[16px] py-[8px] bg-color-white hover:brightness-95 border border-black/40">
          <AddIcon className="size-[24px] fill-color-black" />
          <span>Cadastrar Processo</span>
        </Button>
      </div>
      <div className="flex flex-col gap-[24px] size-full">{renderClientCases}</div>
    </div>
  );
}
