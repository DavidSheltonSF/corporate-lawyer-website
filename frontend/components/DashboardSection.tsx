'use client';
import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { WithId } from '@/types/WithId';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';
import { mockPromise } from '@/test/mockPromise';
import { DashboardCardSkeleton } from './DashboardCardSkeleton';
import { fetchClientCasesStats } from '@/services/fetchClientCasesStats';

interface Props {
  userData: WithId<User>;
}

export function DashboardSection({ userData }: Props) {
  const [casesCountLoading, setCasesCoundLoading] = useState(true);
  const [inProgressCasesCount, setInProgressCasesCount] = useState(0);
  const [closedCasesCount, setClosedCasesCount] = useState(0);

  useEffect(() => {
    async function fetchCases() {
      const casesCount = await fetchClientCasesStats();
      console.log(casesCount)

      mockPromise(10);
      setInProgressCasesCount(casesCount.inProgress);
      setClosedCasesCount(casesCount.closed);
      setCasesCoundLoading(false);
    }
    fetchCases();
  }, []);

  return (
    <div className="flex flex-wrap gap-[40px]">
      {casesCountLoading ? (
        <DashboardCardSkeleton title="Processos" />
      ) : (
        <DashboardCard title="Processos" sectionIndex={1}>
          <DashboardCardInfo name="Em andamento" value={inProgressCasesCount} />
          <DashboardCardInfo name="Encerrados" value={closedCasesCount} />
        </DashboardCard>
      )}
      <DashboardCard title="Atendimento">
        <DashboardCardInfo name="Data" value="2 de jan. de 2026" />
      </DashboardCard>
      <DashboardCard title="Próxima audiência">
        <DashboardCardInfo name="Data" value="15 de jan. de 2026" />
      </DashboardCard>
      <DashboardCard title="Documentação">
        <DashboardCardInfo name="status" value="pendente" />
      </DashboardCard>
    </div>
  );
}
