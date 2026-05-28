'use client';
import { CaseCard } from '../CaseCard/CaseCard';
import { WithId } from '@/types/WithId';
import { CardSkeleton } from '../../../ui/Card/CardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { RequestState } from '@/types/RequestState';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { Page } from '@/types/Page';
import { useModal } from '@/hooks/useModal';
import { CasesListLoading } from './CasesListLoading';
import { CasesListData } from './CasesListData';

interface Props {
  requestState: RequestState<Page<WithId<CaseWithRelations>>>;
  loadCases: () => void;
}

CasesList.Loading = CasesListLoading;
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

    openModal('confirm', {
      message: 'Processo removido com sucesso',
      onConfirm: () => openModal(null),
    });
    loadCases();
  }

  function renderContent() {
    switch (requestState?.status) {
      case 'loading':
        return <CasesList.Loading />;

      case 'empty':
        return <h1>Nenhum processo encontrado</h1>;

      case 'ok':
        const data = requestState.data?.data;
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
