'use client';
import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { useEffect, useState } from 'react';
import { mockPromise } from '@/test/mockPromise';
import { DashboardCardSkeleton } from './DashboardCardSkeleton';
import { getMyCasesStats } from '@/services/cases/getMyCasesStats';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { UserRole } from '@/types/UserRole';
import { getCasesStats } from '@/services/cases/getCasesStats';
import { RequestState } from '@/types/RequestState';
import { handleLogout } from '@/lib/handleLogout';

export function DashboardSection() {
  const [openCasesCount, setOpenCasesCount] = useState(0);
  const [closedCasesCount, setClosedCasesCount] = useState(0);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const isLoading = requestState?.status === 'loading';

  const context = useAuthenticatedUserContext();
  if (!context) {
    throw new MissingContextError('AuthenticatedUserContext');
  }

  const authUserData = context.userData;

  const userRole = authUserData.role;

  async function fetchCases() {
    let response = null;

    setRequestState({ status: 'loading' });

    switch (userRole) {
      case UserRole.lawyer || UserRole.admin:
        response = await getCasesStats();
        break;

      case UserRole.client:
        response = await getMyCasesStats();
        break;
      default:
        break;
    }

    if (response && !response.success) {
      const { code, message, details } = response;
      setRequestState({ status: 'error', code, message, details });
    }

    const casesCount = response?.data;
    setOpenCasesCount(casesCount?.open || 0);
    setClosedCasesCount(casesCount?.closed || 0);
    setRequestState({ status: 'ok' });
  }

  useEffect(() => {
    fetchCases();

    if (requestState?.code === 'UNAUTHORIZED') {
      handleLogout();
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-[40px]">
      {isLoading ? (
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
