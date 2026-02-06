import { UserDataContext } from '@/contexts/UserDataContext';
import { formatStringList } from '@/lib/formatStringList';
import { Case } from '@/types/Case';
import { useContext } from 'react';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { reduceString } from '@/lib/reduceString';
import { TooltipContainer } from './TooltipContainer';
import { WithId } from '@/types/WithId';
import Link from 'next/link';
import { UserIdentity } from '@/types/UserIdentity';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';

interface Props {
  caseData: WithId<Case> & {
    lawyers: WithId<UserIdentity>[];
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
      statusColor = 'text-yellow-500';
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
    <article className="flex flex-col fade-in-animation  bg-color-primary w-full min-md:w-[80%] min-lg:w-[640px] h-max rounded-xl">
      <Link
        className="flex flex-col flex-1"
        href={`clientPage/Case/${id}`}
        scroll={false}
        style={{
          borderRadius: 'inherit',
        }}
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
              {userData?.firstName} {userData?.lastName}
            </p>
          </span>
          <span className="flex gap-[8px]">
            <p className="font-bold">advogados:</p>
            <p>{formatStringList(renderLawyers)}</p>
          </span>
          <span className="flex gap-[8px]">
            <p className="font-bold">status:</p>
            <p className={`font-bold ${statusColor}`}>{CaseStatusLabel[status]}</p>
          </span>
        </main>
      </Link>
    </article>
  );
}
