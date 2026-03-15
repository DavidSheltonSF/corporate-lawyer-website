import { formatStringList } from '@/lib/formatStringList';
import { Case } from '@/types/Case';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { reduceString } from '@/lib/reduceString';
import { TooltipContainer } from './TooltipContainer';
import { WithId } from '@/types/WithId';
import { UserIdentity } from '@/types/UserIdentity';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { MissingContextError } from '@/errors/MissingContextError';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { CaseWithRelations } from '@/types/CaseWithRelations';

interface Props {
  caseData: WithId<CaseWithRelations>;
}

export function CaseCard({ caseData }: Props) {
  const clientData = caseData.client;

  const { id, title, processNumber, status } = caseData;

  let statusColor = '';

  switch (status) {
    case CaseStatusEnum.open:
      statusColor = 'text-green-400';
      break;

      break;
    case CaseStatusEnum.closed:
      statusColor = 'text-red-500';
      break;

    default:
      break;
  }

  const lawyersNames = caseData.lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  const caseModalContext = useCaseModalContext();

  if (!caseModalContext) {
    throw new MissingContextError('CaseModalContext');
  }

  const { setIsOpen, setCaseId } = caseModalContext;

  return (
    <article
      onClick={() => {
        setCaseId(id);
        setIsOpen(true);
      }}
      className="flex flex-col fade-in-animation  bg-color-primary w-full min-md:w-[80%] min-lg:w-[640px] min-h-[280px] h-max rounded-xl cursor-pointer"
    >
      <header className="flex items-center justify-center min-md:justify-start w-full p-[16px] min-md:p-[24px]">
        <TooltipContainer
          label={title}
          tooltipLabelProps={{
            color: '#ffd000ff',
            backgroundColor: '#000',
            position: {
              bottom: '115%',
              left: '50%',
              translateX: '-50%',
            },
          }}
        >
          <h1 className="h-fit font-bold text-center min-md:text-start text-xl min-md:text-3xl">
            {reduceString(title, 35)}
          </h1>
        </TooltipContainer>
      </header>
      <main
        className="flex flex-1 flex-col gap-[16px] px-[24px] py-[16px] bg-color-white text-color-black text-lg"
        style={{
          borderRadius: 'inherit',
        }}
      >
        <span className="flex gap-[8px]">
          <p className="font-bold">nº:</p>
          <p>{processNumber}</p>
        </span>
        <span className="flex gap-[8px]">
          <p className="font-bold">cliente:</p>
          <p>
            {clientData?.firstName} {clientData?.lastName}
          </p>
        </span>
        <span className="flex gap-[8px]">
          <p className="font-bold">advogados:</p>
          <p>{formatStringList(lawyersNames)}</p>
        </span>
        <span className="flex gap-[8px]">
          <p className="font-bold">status:</p>
          <p className={`font-bold ${statusColor}`}>{CaseStatusLabel[status]}</p>
        </span>
      </main>
    </article>
  );
}
