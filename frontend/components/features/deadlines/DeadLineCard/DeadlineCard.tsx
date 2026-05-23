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
      <div className="flex justify-between  items-end gap-[16px]">
        <div className="flex flex-1 flex-col gap-[8px]">
          <h3 className="">{deadline.type}</h3>
          <RemainingDaysBadge remainingDays={deadline.remainingDays} />
        </div>
        <div className="flex-1 ">
          <p>
            {formatDate(deadline.startDate)} - {formatDate(deadline.dueDate)}
          </p>
          <p className="text-muted">Prazo final</p>
        </div>
        <div className="flex flex-1  flex-col gap-[8px]">
          <PriorityBadge priority={deadline.priority} />
        </div>
      </div>
    </Card>
  );
}
