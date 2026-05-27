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
import { CasesStats } from '@/types/CasesStats';
import { DashboardSkeleton } from './features/deashboard/DashboardSkeleton';
import { Dashboard } from './features/deashboard/Dashboard';

export function DashboardSection() {
  const [requestState, setRequestState] = useState<RequestState<CasesStats>>({ status: 'idle' });
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
      case UserRole.admin:
      case UserRole.lawyer:
        response = await getCasesStats();
        break;

      case UserRole.client:
        response = await getMyCasesStats();
        break;
    }

    if (!response) {
      return setRequestState({ status: 'error', message: 'Invalid role' });
    }

    if (!response.success) {
      const { code, message, details } = response;
      setRequestState({ status: 'error', code, message, details });
      return;
    }

    setRequestState({ status: 'ok', data: response.data });
  }

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    if (requestState?.status === 'error') {
      requestState.code === 'UNAUTHORIZED' && handleLogout();
    }
  }, [requestState]);

  switch (requestState.status) {
    case 'idle':
    case 'loading':
      return <DashboardSkeleton />;
    case 'ok':
      return <Dashboard data={requestState.data} />;

    case 'error':
      return null;
  }
}
