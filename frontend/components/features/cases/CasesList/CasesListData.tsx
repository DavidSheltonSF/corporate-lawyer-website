import { WithId } from '@/types/WithId';
import { CaseCard } from '../CaseCard/CaseCard';
import { Case } from '@/types/Case';
import { CaseWithRelations } from '@/types/CaseWithRelations';

interface Props {
  data?: WithId<CaseWithRelations>[];
  refetchCases: () => void;
  handleDeleteCase: (id: string) => void;
}

export function CasesListData({ data, refetchCases, handleDeleteCase }: Props) {
  const renderCases = data?.map((cas, index) => {
    return (
      <CaseCard
        refetchCases={refetchCases}
        deleteCase={handleDeleteCase}
        key={cas.id}
        caseData={cas}
      />
    );
  });

  return <>{renderCases}</>;
}
