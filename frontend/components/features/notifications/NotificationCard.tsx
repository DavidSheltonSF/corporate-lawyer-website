'use client';

import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { Notification } from '@/types/Notification';
import { WithId } from '@/types/WithId';
import { NotificationIcon } from '../../icons/NotificationIcon';
import { useState } from 'react';
import { markNotificationAsRead } from '@/services/notifications/markNotificationAsRead';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { useNotificationsModalContext } from '@/hooks/useNotificationsModalContext';
import { EntityType } from '@/types/EntityType';
import { NotificationIconSelector } from './NotificationIconSelector';

interface Props {
  notificationData: WithId<Notification>;
  decreaceUnreadCount: Function;
}

export function NotificationCard({ notificationData, decreaceUnreadCount }: Props) {
  const [notification, setNotification] = useState<WithId<Notification>>(notificationData);
  const { title, message, createdAt, isRead } = notification;
  const caseModalContext = useCaseModalContext();
  const { setIsOpen } = useNotificationsModalContext();
  const setCaseModalIsOpen = caseModalContext.setIsOpen;
  const setSelectedCaseId = caseModalContext.setSelectedCaseId;

  async function markAsRead() {
    const updatedNotification = await markNotificationAsRead(notification.id);
    setNotification(updatedNotification);
    decreaceUnreadCount();
  }

  function openRelatedCaseModal() {
    setSelectedCaseId(notification.metadata?.entityId || '');
    setCaseModalIsOpen(true);
    setIsOpen(false);
  }

  async function handleNotificationClick() {
    try {
      if (!isRead) {
        await markAsRead();
      }

      if (notification?.metadata?.entityType === EntityType.CASE) {
        openRelatedCaseModal();
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const baseStyles = 'flex border w-full min-h-fit rounded-md p-[16px] shadow-lg fade-in-animation';
  const isReadStyles =
    'cursor-pointer border-color-primary-light inner-shadow-soft-primary hover:-translate-y-0.5 transition-all duration-300';

  return (
    <article
      onClick={handleNotificationClick}
      className={`${baseStyles} ${!isRead ? isReadStyles : ''}`}
    >
      <div className="flex size-full items-center gap-[16px]">
        <div className="flex justify-center items-center min-h-[56px] min-w-[56px] size-[56px] border rounded-md">
          <NotificationIconSelector notificationType={notification.type} />
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
