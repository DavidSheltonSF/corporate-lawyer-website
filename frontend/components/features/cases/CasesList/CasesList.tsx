'use client';
import { WithId } from '@/types/WithId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { CasesListSkeleton } from './CasesListSkeleton';
import { CaseCard } from '../CaseCard/CaseCard';

interface Props {
  cases: WithId<CaseWithRelations>[];
  onDelete: (caseId: string) => void;
  openUpdateModal: (caseId: string) => void;
}

CasesList.Skeleton = CasesListSkeleton;

export function CasesList({ cases, onDelete, openUpdateModal }: Props) {
  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        deleteCase={onDelete}
        openUpdateModal={openUpdateModal}
        key={cas.id}
        caseData={cas}
      />
    );
  });

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderCases}</div>;
}
