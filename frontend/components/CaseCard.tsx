import { UserDataContext } from '@/contexts/UserDataContext';
import { formatStringList } from '@/lib/formatStringList';
import { CaseProps } from '@/types/CaseProps';
import { useContext } from 'react';
import { CaseStatusEnum } from '@/types/CaseProps';
import { reduceString } from '@/lib/reduceString';
import { TooltipContainer } from './TooltipContainer';
import { LawyerBasicInfoProps } from '@/types/LawyerBasicInfoProps';
import { WithId } from '@/types/WithId';
import Link from 'next/link';

interface Props {
  caseData: WithId<CaseProps> & {
    lawyers: WithId<LawyerBasicInfoProps>[];
  };
}

export function CaseCard({ caseData }: Props) {
  const context = useContext(UserDataContext);

  const userData = context?.userData;

  const { id, title, processNumber, status } = caseData;

  let statusColor = '';

  switch (status) {
    case CaseStatusEnum.aberto:
      statusColor = 'text-green-400';
      break;

    case CaseStatusEnum.em_andamento:
      statusColor = 'text-green-600';
      break;

    case CaseStatusEnum.esperando_documentos:
      statusColor = 'text-yellow-00';
      break;
    case CaseStatusEnum.encerrado:
      statusColor = 'text-red-500';
      break;

    default:
      break;
  }

  const renderLawyers = caseData.lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  return (
    <TooltipContainer
      label={title}
      tooltipLabelProps={{
        color: '#ffd000ff',
        backgroundColor: '#000',
        position: {
          bottom: '105%',
          left: '50%',
          translateX: '-50%',
        },
      }}
    >
      <article className="flex flex-col fade-in-animation  bg-color-primary w-[640px] h-[256px] rounded-xl overflow-hidden">
        <Link href={`clientPage/Case/${id}`}>
          <header className="flex items-center pl-[24px] h-[56px]">
            <h1 className="h-fit font-bold text-3xl">{reduceString(title, 35)}</h1>
          </header>
          <main className="flex flex-col gap-[16px] px-[24px] py-[16px] flex-1 bg-color-white text-color-black text-lg">
            <span className="flex gap-[8px]">
              <p className="font-bold">nº:</p>
              <p>{processNumber}</p>
            </span>
            <span className="flex gap-[8px]">
              <p className="font-bold">cliente:</p>
              <p>
                {userData?.firstName} {userData?.lastName}
              </p>
            </span>
            <span className="flex gap-[8px]">
              <p className="font-bold">advogados:</p>
              <p>{formatStringList(renderLawyers)}</p>
            </span>
            <span className="flex gap-[8px]">
              <p className="font-bold">status:</p>
              <p className={`font-bold ${statusColor}`}>{status}</p>
            </span>
          </main>
        </Link>
      </article>
    </TooltipContainer>
  );
}
