'use client';
import { DashboardCard } from './DashboardCard';
import { DashboardCardInfo } from './DashboardCardInfo';
import { useEffect, useState } from 'react';
import { mockPromise } from '@/test/mockPromise';
import { DashboardCardSkeleton } from './DashboardCardSkeleton';
import { getMyCasesStats } from '@/services/cases/getMyCasesStats';
import { UserRole } from '@/types/UserRole';
import { getCasesStats } from '@/services/cases/getCasesStats';
import { RequestState } from '@/types/RequestState';
import { handleLogout } from '@/lib/handleLogout';
import { CasesStats } from '@/types/CasesStats';
import { DashboardSkeleton } from './features/deashboard/DashboardSkeleton';
import { Dashboard } from './features/deashboard/Dashboard';
import { useAuthStore } from '@/stores/useAuthStore';

export function DashboardSection() {
  const [requestState, setRequestState] = useState<RequestState<CasesStats>>({ status: 'loading' });
  const isLoading = requestState?.status === 'loading';
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function fetchCases() {
      if (!user) return;
      let response = null;

      setRequestState({ status: 'loading' });

      switch (user.role) {
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

    fetchCases();
  }, [user]);

  useEffect(() => {
    if (requestState?.status === 'error') {
      requestState.code === 'UNAUTHORIZED' && handleLogout();
    }
  }, [requestState]);

  if (!user) {
    return <DashboardSkeleton />;
  }

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
