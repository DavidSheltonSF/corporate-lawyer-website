'use client';
import { CaseCard } from './CaseCard/CaseCard';
import { WithId } from '@/types/WithId';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { RequestState } from '@/types/RequestState';
import { deleteCaseById } from '@/services/users/deleteCaseById';
import { Page } from '@/types/Page';

interface Props {
  requestState: RequestState<Page<WithId<CaseWithRelations>>>;
  loadCases: () => void;
}

export function CasesList({ requestState, loadCases }: Props) {
  async function deleteCase(id: string) {
    try {
      await deleteCaseById(id);
      loadCases();
    } catch (error: any) {
      console.log(error);
    }
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
            <CaseCard refetchCases={loadCases} deleteCase={deleteCase} key={index} caseData={cas} />
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
