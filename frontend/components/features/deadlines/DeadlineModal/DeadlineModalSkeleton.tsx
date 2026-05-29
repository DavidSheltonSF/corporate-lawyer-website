import { Button } from '@/components/ui/Button/Button';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { SkeletonLine } from '@/components/ui/SkeletonLine';
import { DeadlineCardSkeleton } from '../DeadLineCard/DeadlineCardSkeleton';

export function DeadlineModalSkeleton() {
  const skeletons = Array.from({length: 4}).map((deadline, index) => {
    return <DeadlineCardSkeleton key={index}/>;
  });

  return (
    <div className="flex flex-col max-h-[58vh]">
      <div className="flex flex-col min-lg:flex-row min-lg:items-center p-[24px] border-divider gap-[16px] min-lg:gap-0">
        <span className="flex items-center gap-[8px] font-bold">
          <span>Quantidade:</span> <SkeletonLine className="w-[40px] h-[20px]" />
        </span>
        <Button
          variant={ButtonVariant.DISABLED}
          disabled
          className="border border-black bg-color-white min-lg:ml-auto"
        >
          Adicionar Prazo
        </Button>
      </div>
      <div className="flex flex-col gap-[16px] border-divider p-[24px] overflow-y-auto">
        {skeletons}
      </div>
    </div>
  );
}
