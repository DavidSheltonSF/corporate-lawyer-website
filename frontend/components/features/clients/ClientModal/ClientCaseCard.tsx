import { Card } from '@/components/ui/Card/Card';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { useSelectedCaseContext } from '@/hooks/useSelectedCaseContext';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';

interface Props {
  caseData: WithId<Case>;
}
export function ClientCaseCard({ caseData }: Props) {
  const { id, title, description } = caseData;
  const { setSelectedCaseId } = useSelectedCaseContext();
  const caseModalContext = useCaseModalContext();
  const setCaseModalIsOpen = caseModalContext.setIsOpen

  return (
    <Card
      key={id}
      className="w-full h-fit cursor-pointer"
      openModal={() => {
        setSelectedCaseId(id);
        setCaseModalIsOpen(true);
      }}
      openOptionsModal={() => null}
    >
      <div className="flex flex-col gap-[8px] w-full border-[1px] p-[8px] rounded-[8px]">
        <h3 className="font-bold ">{title}</h3>
        <div className="flex flex-col">{description}</div>
      </div>
    </Card>
  );
}
