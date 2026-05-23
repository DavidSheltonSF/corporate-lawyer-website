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
    <Card key={deadline.id} className="shadow-soft w-full p-[24px]">
      <div className="flex flex-col min-md:flex-row min-lg:justify-between min-md:items-end gap-[16px] text-sm min-md:text-md">
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold">{deadline.type}</p>
          <RemainingDaysBadge remainingDays={deadline.remainingDays} />
        </div>
        <div className='order-3 min-md:order-none' >
          <p className="text-muted">
            {formatDate(deadline.startDate)} - {formatDate(deadline.dueDate)}
          </p>
          <p className="text-muted">Prazo final</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <PriorityBadge priority={deadline.priority} />
        </div>
      </div>
    </Card>
  );
}
