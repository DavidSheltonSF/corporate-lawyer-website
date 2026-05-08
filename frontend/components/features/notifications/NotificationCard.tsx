'use client';

import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { Notification } from '@/types/Notification';
import { WithId } from '@/types/WithId';
import { NotificationIcon } from '../../icons/NotificationIcon';
import { useState } from 'react';
import { markNotificationAsRead } from '@/services/notifications/markNotificationAsRead';

interface Props {
  notificationData: WithId<Notification>;
  decreaceUnreadCount: Function;
}

export function NotificationCard({ notificationData, decreaceUnreadCount }: Props) {
  const [notification, setNotification] = useState<WithId<Notification>>(notificationData);
  const { title, message, createdAt, isRead } = notification;

  async function handleNotificationClick(id: string) {
    try {
      const updatedNotification = await markNotificationAsRead(id);
      setNotification(updatedNotification);
      decreaceUnreadCount();
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <article
      onClick={() => handleNotificationClick(notification.id)}
      className={`flex border w-full min-h-fit rounded-md p-[16px] shadow-lg ${
        !isRead
          ? 'cursor-pointer border-color-primary-light inner-shadow-soft-primary hover:-translate-y-0.5 transition-all duration-300'
          : ''
      }`}
    >
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
