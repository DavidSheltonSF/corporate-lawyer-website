import { Card } from '@/components/ui/Card/Card';
import { formatDate } from '@/lib/formatDate';
import { Deadline } from '@/types/Deadline';
import { WithId } from '@/types/WithId';
import { RemainingDaysBadge } from '../badges/RemainingDaysBadge';
import { PriorityBadge } from '../badges/PriorityBadge';

interface Props {
  deadline: WithId<Deadline>;
}

export function DeadlineCard({ deadline }: Props) {
  return (
    <Card key={deadline.id} className="border-divider rounded-none w-full p-[24px]">
      <div className="flex flex-col min-md:flex-row min-md:justify-between min-md:items-end gap-[16px] text-sm min-md:text-md">
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold text-base">{deadline.type}</p>
          <p className="text-muted">
            {formatDate(deadline.startDate)} - {formatDate(deadline.dueDate)}
          </p>
          <p className="text-muted">Prazo final</p>
        </div>
        <div className="flex gap-[8px]">
          <RemainingDaysBadge remainingDays={deadline.remainingDays} />
          <PriorityBadge priority={deadline.priority} />
        </div>
      </div>
    </Card>
  );
}
