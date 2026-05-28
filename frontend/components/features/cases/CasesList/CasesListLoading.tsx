import { CardSkeleton } from '@/components/ui/Card/CardSkeleton';

export function CasesListLoading() {
  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CardSkeleton key={index} />;
  });
  return <>{renderCaseSkeletons}</>;
}
