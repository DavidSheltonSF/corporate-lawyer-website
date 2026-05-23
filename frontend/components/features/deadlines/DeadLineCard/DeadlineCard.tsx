import { Card } from '@/components/ui/Card/Card';
import { formatDate } from '@/lib/formatDate';
import { Deadline } from '@/types/Deadline';
import { DeadlineStatus } from '@/types/DeadlineStatus';
import { WithId } from '@/types/WithId';

interface Props {
  deadline: WithId<Deadline>;
}

export function DeadlineCard({ deadline }: Props) {
  function renderDeadlineStatus(deadline: WithId<Deadline>) {
    const isExpired = deadline.status === DeadlineStatus.VENCIDO;
    if (isExpired) {
      return <p>Expirou</p>;
    }

    if (deadline.remainingDays === 0) {
      return <p>Expira hoje</p>;
    }

    return <p>Expira em {deadline.remainingDays}</p>;
  }

  return (
    <Card key={deadline.id} className="border border-black w-full p-[24px]">
      <p>{deadline.type}</p>
      {renderDeadlineStatus(deadline)}
      <p>
        {formatDate(deadline.startDate)} - {formatDate(deadline.dueDate)}
      </p>
      <p>{deadline.priority} prioridate</p>
    </Card>
  );
}
