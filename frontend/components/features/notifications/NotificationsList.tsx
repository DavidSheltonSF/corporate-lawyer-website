import { Notification } from '@/types/Notification';
import { WithId } from '@/types/WithId';
import { NotificationCard } from './NotificationCard';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  notifications: WithId<Notification>[];
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}
export function NotificationsList({ notifications, unreadCount, setUnreadCount }: Props) {
  const sortedNotifications = notifications.toSorted((a, b) => {
    const aCreatedAt = new Date(a.createdAt);
    const bCreatedAt = new Date(b.createdAt);
    return bCreatedAt.getTime() - aCreatedAt.getTime();
  });

  const renderNotifications = sortedNotifications.map((notification, index) => {
    return (
      <NotificationCard
        key={notification.id}
        notificationData={notification}
        decreaceUnreadCount={() => setUnreadCount(unreadCount - 1)}
      />
    );
  });

  return <div className="flex flex-col gap-[24px]">{renderNotifications}</div>;
}
