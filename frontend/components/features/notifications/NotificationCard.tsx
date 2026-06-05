'use client';

import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { Notification } from '@/types/Notification';
import { WithId } from '@/types/WithId';
import { useState } from 'react';
import { markNotificationAsRead } from '@/services/notifications/markNotificationAsRead';
import { useNotificationsModalContext } from '@/hooks/useNotificationsModalContext';
import { EntityType } from '@/types/EntityType';
import { NotificationIconSelector } from './NotificationIconSelector';
import { NotificationType } from '@/types/NotificationType';
import { Button } from '@/components/ui/Button/Button';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { useCaseModal } from '@/hooks/modals/useCaseModal';

interface Props {
  notificationData: WithId<Notification>;
  decreaceUnreadCount: Function;
}

export function NotificationCard({ notificationData, decreaceUnreadCount }: Props) {
  const [notification, setNotification] = useState<WithId<Notification>>(notificationData);
  const { title, message, createdAt, isRead } = notification;
  const { setIsOpen } = useNotificationsModalContext();
  const { openCaseModal } = useCaseModal();

  async function markAsRead() {
    const updatedNotification = await markNotificationAsRead(notification.id);
    setNotification(updatedNotification);
    decreaceUnreadCount();
  }

  function openRelatedCaseModal() {
    if (!notification.metadata) return;
    openCaseModal(notification.metadata?.entityId);
    setIsOpen(false);
  }

  async function handleNotificationClick() {
    try {
      if (!isRead) {
        await markAsRead();
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function handleOpenRelatedModal() {
    if (notification.type === NotificationType.DELETED) {
      return;
    }

    if (notification?.metadata?.entityType === EntityType.CASE) {
      openRelatedCaseModal();
    }
  }

  const baseStyles =
    'relative flex flex-col w-full min-h-fit fade-in-animation transition-[background] duration-300 border-divider';
  const readStyles = 'cursor-pointer  hover:bg-gray-200';

  const unReadStyles = 'cursor-pointer bg-blue-100 hover:bg-blue-200';

  return (
    <article
      onClick={handleNotificationClick}
      className={`${baseStyles} ${!isRead ? unReadStyles : readStyles}`}
    >
      <div className="flex size-full items-center gap-[16px] p-[16px]">
        <div className="flex justify-center items-center min-h-[56px] min-w-[56px] size-[56px] border rounded-md">
          <NotificationIconSelector notificationType={notification.type} />
        </div>
        <div className="flex flex-col size-full gap-[8px]">
          <p className="text-sm min-md:text-base">{message}</p>
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenRelatedModal();
            }}
            className="w-fit text-blue-500 hover:text-blue-400 cursor-pointer text-sm"
          >
            Conferir
          </Button>
        </div>
        <div className="flex h-full shrink-0  justify-end items-start">
          <span className=" text-gray-500 text-sm">{formatRelativeTime(new Date(createdAt))}</span>
        </div>
      </div>
    </article>
  );
}
