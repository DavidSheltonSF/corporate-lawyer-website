'use client';
import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { useEffect, useState } from 'react';
import { mockPromise } from '@/test/mockPromise';
import { DashboardCardSkeleton } from './DashboardCardSkeleton';
import { fetchMyCasesStats } from '@/services/fetchMyCasesStats';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { UserRole } from '@/types/UserRole';
import { getCasesStats } from '@/services/getCasesStats';

export function DashboardSection() {
  const [casesCountLoading, setCasesCoundLoading] = useState(true);
  const [openCasesCount, setOpenCasesCount] = useState(0);
  const [closedCasesCount, setClosedCasesCount] = useState(0);

  const context = useAuthenticatedUserContext();
  if (!context) {
    throw new MissingContextError('AuthenticatedUserContext');
  }

  const authUserData = context.userData;

  const userRole = authUserData.role;

  useEffect(() => {
    async function fetchCases() {
      let casesCount = { open: 0, closed: 0 };

      switch (userRole) {
        case UserRole.lawyer || UserRole.admin:
          casesCount = await getCasesStats();
          break;

        case UserRole.client:
          casesCount = await fetchMyCasesStats();
          break;
        default:
          break;
      }

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
