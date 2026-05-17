'use client';
import { CaseCard } from './CaseCard/CaseCard';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { RequestState } from '@/types/RequestState';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loading: boolean;
  loadCases: () => void;
}

export function CasesList({ cases, loading, loadCases }: Props) {
  const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function deleteCase(id: string) {
    try {
      setRequestState({ status: 'loading' });
      await deleteCaseById(id);
      setRequestState({ status: 'ok', message: 'Case deleted successfuly' });
      loadCases();
    } catch (error: any) {
      setRequestState({ status: 'error', message: error.message });
      console.log(error);
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
      refetchCases={loadCases}
        deleteCase={deleteCase}
        key={index}
        isDropdownOpen={openedDropdownId === cas.id}
        closeDropdown={() => setOpenedDropdownId(null)}
        openDropdown={() => {
          setOpenedDropdownId(cas.id);
        }}
        caseData={cas}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CardSkeleton key={index} />;
  });

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <Activity mode={!loading && (!cases || cases.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
