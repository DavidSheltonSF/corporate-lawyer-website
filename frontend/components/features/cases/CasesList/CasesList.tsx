'use client';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { RequestState } from '@/types/RequestState';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { Page } from '@/types/Page';
import { useModal } from '@/hooks/useModal';
import { CasesListSkeleton } from './CasesListSkeleton';
import { CasesListData } from './CasesListData';

interface Props {
  requestState: RequestState<Page<WithId<CaseWithRelations>>>;
  loadCases: () => void;
}

CasesList.Skeleton = CasesListSkeleton;
CasesList.Data = CasesListData;

export function CasesList({ requestState, loadCases }: Props) {
  const { openModal } = useModal();

  async function handleDeleteCase(id: string) {
    const response = await deleteCaseById(id);

    if (!response.success) {
      return openModal('confirm', {
        message: response.message,
        onConfirm: () => openModal(null),
      });
    }

    openModal('success', {
      message: 'Processo removido com sucesso',
      onConfirm: () => openModal(null),
    });
    loadCases();
  }

  function renderContent() {
    switch (requestState?.status) {
      case 'loading':
        return <CasesList.Skeleton />;

      case 'ok':
        const data = requestState.data?.data;
        if (data.length === 0) {
          return <h1>Nenhum processo encontrado</h1>;
        }
        return (
          <CasesList.Data
            data={data}
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
