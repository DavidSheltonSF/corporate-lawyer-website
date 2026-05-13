import { reduceString } from '@/lib/reduceString';
import { Case } from '@/types/Case';
import { Button } from '../../../ui/Button/Button';
import { AddIcon } from '@/components/icons/AddIcon';
import { WithId } from '@/types/WithId';
import { Card } from '@/components/ui/Card/Card';

interface Props {
  cases: WithId<Case>[];
  openRegisterCaseModal: () => void;
}

export function ClientModalCases({ cases, openRegisterCaseModal }: Props) {
  const renderClientCases = cases.map((cas, index) => {
    return (
      <Card
        key={cas.id}
        className="w-full h-fit"
        openModal={() => null}
        openOptionsModal={() => null}
      >
        <div className="flex flex-col gap-[8px] w-full border-[1px] p-[8px] rounded-[8px]">
          <h2 className="font-bold ">{cas.title}</h2>
          <div className="flex flex-col">{cas.description}</div>
        </div>
      </Card>
    );
  });
  return (
    <div className="flex flex-col gap-[24px] p-[24px]">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-2xl font-bold">Processos</h1>
        <Button
          darkHover
          backgroundColor="var(--white-color)"
          textColor="var(--black-color)"
          size="fit-content"
          paddingX="16px"
          paddingY="8px"
          border="1px solid var(--black-color)"
          onclick={() => openRegisterCaseModal()}
        >
          <span className="flex justify-center items-center gap-[8px]">
            <AddIcon width="24px" height="24px" color="var(--black-color)" />
            <span>Adicionar</span>
          </span>
        </Button>
      </div>
      <div className="flex flex-col gap-[24px] size-full">{renderClientCases}</div>
    </div>
  );
}
