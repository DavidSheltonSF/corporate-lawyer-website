'use client';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { CasesListSkeleton } from './CasesListSkeleton';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';
import { CaseCard } from '../CaseCard/CaseCard';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loadCases: () => void;
}

CasesList.Skeleton = CasesListSkeleton;

export function CasesList({ cases, loadCases }: Props) {
  const { openSuccessModal } = useSuccessModal();
  const { openErrorModal } = useErrorModal();

  async function handleDeleteCase(id: string) {
    const response = await deleteCaseById(id);

    if (!response.success) {
      openErrorModal(response.message);
      return;
    }

    openSuccessModal('rocesso removido com sucesso');

    loadCases();
  }

  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        refetchCases={loadCases}
        deleteCase={handleDeleteCase}
        key={cas.id}
        caseData={cas}
      />
    );
  });

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderCases}</div>;
}
