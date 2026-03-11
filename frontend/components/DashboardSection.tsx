'use client';
import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { useEffect, useState } from 'react';
import { mockPromise } from '@/test/mockPromise';
import { DashboardCardSkeleton } from './DashboardCardSkeleton';
import { fetchMyCasesStats } from '@/services/fetchMyCasesStats';

export function DashboardSection() {
  const [casesCountLoading, setCasesCoundLoading] = useState(true);
  const [openCasesCount, setOpenCasesCount] = useState(0);
  const [closedCasesCount, setClosedCasesCount] = useState(0);

  useEffect(() => {
    async function fetchCases() {
      const casesCount = await fetchMyCasesStats();
      console.log(casesCount);

      mockPromise(10);
      setOpenCasesCount(casesCount.open);
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
          <DashboardCardInfo name="Em andamento" value={openCasesCount} />
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
