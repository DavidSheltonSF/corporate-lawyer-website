import { UserDataContext } from '@/contexts/UserDataContext';
import { getLawyersInformation } from '@/lib/getLawyerInformation';
import { getUserInformation } from '@/lib/getUserInformation';
import { CaseProps } from '@/types/CaseProps';
import { useContext, useEffect, useState } from 'react';

interface Props {
  caseData: CaseProps;
}

export function CaseCard({ caseData }: Props) {
  const [lawyer, setLawyer] = useState<any>(null)

  const context = useContext(UserDataContext)

  const userData = context?.userData;

  const {lawyerIds, title, processNumber, status} = caseData

  useEffect(() => {
    async function loadLawyerData() {
      const data = await getLawyersInformation(['flavia1'])
      console.log(data);
      setLawyer(data)
    }
    loadLawyerData()
  }, [])

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
          <p>{lawyer}</p>
        </span>
        <span className="flex gap-[8px]">
          <p className="font-bold">status:</p>
          <p className="font-bold">{status}</p>
        </span>
      </main>
    </div>
  );
}
