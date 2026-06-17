import { CardSkeleton } from '@/components/ui/Card/CardSkeleton';

export function ClientsListSkeleton() {
  const renderSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CardSkeleton key={index} />;
  });

  return <div className="flex flex-col gap-[32px] mt-[88px] w-full">{renderSkeletons}</div>;
}
