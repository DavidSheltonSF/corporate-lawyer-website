import { Card } from '@/components/ui/Card/Card';
import { SkeletonLine } from '@/components/ui/SkeletonLine';

export function DeadlineCardSkeleton() {
  return (
    <Card className="shadow-soft w-full p-[24px]">
      <div className="flex flex-col min-md:flex-row min-md:justify-between min-md:items-end gap-[16px] text-sm min-md:text-md">
        <div className="flex flex-col gap-[8px]">
          <SkeletonLine className="w-[100px]" />
          <SkeletonLine className="w-[40px]" />
          <SkeletonLine className="w-[70px]" />
        </div>
        <div className="flex flex-col min-lg:flex-row gap-[8px]">
          <SkeletonLine className="w-[40px]" />
          <SkeletonLine className="w-[40px]" />
        </div>
      </div>
    </Card>
  );
}
