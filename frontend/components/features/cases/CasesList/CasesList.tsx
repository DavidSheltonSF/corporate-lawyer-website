'use client';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { CasesListSkeleton } from './CasesListSkeleton';
import { CasesListData } from './CasesListData';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loadCases: () => void;
}

CasesList.Skeleton = CasesListSkeleton;
CasesList.Data = CasesListData;

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

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <CasesList.Data data={cases} refetchCases={loadCases} handleDeleteCase={handleDeleteCase} />
    </div>
  );
}
