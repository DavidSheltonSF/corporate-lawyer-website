'use client';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { RequestState } from '@/types/RequestState';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { Page } from '@/types/Page';
import { CasesListSkeleton } from './CasesListSkeleton';
import { CasesListData } from './CasesListData';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';

interface Props {
  requestState: RequestState<Page<WithId<CaseWithRelations>>>;
  loadCases: () => void;
}

CasesList.Skeleton = CasesListSkeleton;
CasesList.Data = CasesListData;

export function CasesList({ requestState, loadCases }: Props) {
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

  function renderContent() {
    switch (requestState?.status) {
      case 'loading':
        return <CasesList.Skeleton />;

      case 'ok':
        const { items } = requestState.data;
        if (items.length === 0) {
          return <h1>Nenhum processo encontrado</h1>;
        }
        return (
          <CasesList.Data
            data={items}
            refetchCases={loadCases}
            handleDeleteCase={handleDeleteCase}
          />
        );

      case 'error':
        return null;

      default:
        return null;
    }
  }

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderContent()}</div>;
}
