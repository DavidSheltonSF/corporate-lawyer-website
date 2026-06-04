import { Button } from '@/components/ui/Button/Button';
import { Deadline } from '@/types/Deadline';
import { WithId } from '@/types/WithId';
import { DeadlineCard } from '../DeadLineCard/DeadlineCard';

interface Props {
  data: WithId<Deadline>[];
}

export function DeadlineModalContent({ data }: Props) {
  const renderDeadlines = data.map((deadline) => {
    return <DeadlineCard key={deadline.id} deadline={deadline} />;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col border-divider overflow-y-auto">{renderDeadlines}</div>
    </div>
  );
}
