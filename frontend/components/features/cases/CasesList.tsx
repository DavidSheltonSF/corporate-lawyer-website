'use client';
import { CaseCard } from './CaseCard/CaseCard';
import { WithId } from '@/types/WithId';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { RequestState } from '@/types/RequestState';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { Page } from '@/types/Page';
import { useModal } from '@/hooks/useModal';

interface Props {
  requestState: RequestState<Page<WithId<CaseWithRelations>>>;
  loadCases: () => void;
}

export function CasesList({ requestState, loadCases }: Props) {
  const { openModal } = useModal();

  async function deleteCase(id: string) {
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
        const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
          return <CardSkeleton key={index} />;
        });
        return renderCaseSkeletons;
      case 'ok':
        const { data } = requestState;
        if (data?.data.length === 0) {
          return <h1>Nenhum processo encontrado</h1>;
        }
        const renderCases = data?.data?.map((cas, index) => {
          return (
            <CaseCard
              refetchCases={loadCases}
              deleteCase={deleteCase}
              key={cas.id}
              caseData={cas}
            />
          );
        });
        return renderCases;

      case 'error':
        return null;

      default:
        return null;
    }
  }

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderContent()}</div>;
}
