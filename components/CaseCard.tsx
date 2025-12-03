import { UserDataContext } from '@/contexts/UserDataContext';
import { formatStringList } from '@/lib/formatStringList';
import { fetchLawyers } from '@/lib/ferchLawyers';
import { CaseProps } from '@/types/CaseProps';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';
import { useContext, useEffect, useState } from 'react';
import { CaseStatusEnum } from '@/types/CaseProps';
interface Props {
  caseData: CaseProps;
}

export function CaseCard({ caseData }: Props) {
  const [lawyers, setLawyers] = useState<WithId<UserProps>[]>([]);

  const context = useContext(UserDataContext);

  const userData = context?.userData;

  const { lawyerIds, title, processNumber, status } = caseData;

  let statusColor = '';

  switch (status) {
    case 'aberto':
      statusColor = 'text-green-400';
      break;

    case 'em_progresso':
      statusColor = 'text-green-600';
      break;

    case 'esperando_documentos':
      statusColor = 'text-yellow-00';
      break;
    case 'encerrado':
      statusColor = 'text-red-500';
      break;

    default:
      break;
  }

  const renderLawyers = lawyers?.map((lawyer) => {
    return `${lawyer.firstName} ${lawyer.lastName}`;
  });

  useEffect(() => {
    async function loadLawyerData() {
      const data = await fetchLawyers(lawyerIds);
      setLawyers(data);
    }
    loadLawyerData();
  }, []);

  return (
    <article className="flex flex-col fade-in-animation  bg-color-primary w-[640px] h-[256px] rounded-xl overflow-hidden">
      <header className="flex items-center pl-[24px] h-[56px]">
        <h1 className="h-fit font-bold text-3xl">{title}</h1>
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
          <p className={`font-bold ${statusColor}`}>{CaseStatusEnum[status]}</p>
        </span>
      </main>
    </article>
  );
}
