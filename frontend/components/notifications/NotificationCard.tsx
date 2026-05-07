import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { Notification } from '@/types/Notification';
import { WithId } from '@/types/WithId';
import { NotificationIcon } from '../icons/NotificationIcon';

interface Props {
  notification: WithId<Notification>;
}

export function NotificationCard({ notification }: Props) {
  const { title, message, createdAt } = notification;
  return (
    <article className="flex border w-[90%] min-h-fit rounded-md p-[16px]">
      <div className="flex size-full items-center gap-[16px]">
        <div className="flex justify-center items-center size-[56px] border rounded-md">
          <NotificationIcon width="60%" height="60%" color="var(--primary-color-light)" />
        </div>
        <div className="flex flex-col h-full w-full">
          <h3 className="font-bold">{title}</h3>
          <p>{message}</p>
          <p className="text-gray-500 small-text">{formatRelativeTime(new Date(createdAt))}</p>
        </div>
      </div>
    </article>
  );
}
