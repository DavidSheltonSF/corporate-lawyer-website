import { UserDataContext } from '@/contexts/UserDataContext';
import { formatStringList } from '@/lib/formatStringList';
import { fetchLawyers } from '@/lib/ferchLawyers';
import { CaseProps } from '@/types/CaseProps';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';
import { useContext, useEffect, useState } from 'react';

interface Props {
  caseData: CaseProps;
}

export function CaseCard({ caseData }: Props) {
  const [lawyers, setLawyers] = useState<WithId<UserProps>[]>([]);

  const context = useContext(UserDataContext);

  const userData = context?.userData;

  const { lawyerIds, title, processNumber, status } = caseData;

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
    <div className="bg-color-primary w-[640px] h-[256px] rounded-xl">
      <header className="pl-[24px] py-[8px]">
        <h1 className="font-bold text-3xl">{title}</h1>
      </header>
      <main className="flex flex-col gap-[8px] px-[24px] py-[8px] bg-color-white text-color-black text-lg">
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
          <p className="font-bold">{status}</p>
        </span>
      </main>
    </div>
  );
}
