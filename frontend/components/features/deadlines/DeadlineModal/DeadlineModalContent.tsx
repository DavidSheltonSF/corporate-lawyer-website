import { Button } from '@/components/ui/Button/Button';
import { Deadline } from '@/types/Deadline';
import { WithId } from '@/types/WithId';
import { DeadlineCard } from '../DeadLineCard/DeadlineCard';

interface Props {
  data: WithId<Deadline>[];
  openCreateModal: () => void;
}

export function DeadlineModalContent({ data, openCreateModal }: Props) {
  const renderDeadlines = data.map((deadline) => {
    return <DeadlineCard key={deadline.id} deadline={deadline} />;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col min-lg:flex-row min-lg:items-center p-[24px] border-divider gap-[16px] min-lg:gap-0">
        <span className="font-bold">Prazos ({data.length})</span>
        <Button
          onClick={openCreateModal}
          className="border border-black bg-color-white hover:brightness-95 min-lg:ml-auto"
        >
          Adicionar Prazo
        </Button>
      </div>
      <div className="flex flex-col gap-[16px] border-divider p-[24px] overflow-y-auto">
        {renderDeadlines}
      </div>
    </div>
  );
}
