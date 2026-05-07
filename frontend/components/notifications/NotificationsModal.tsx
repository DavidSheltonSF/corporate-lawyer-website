'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModalWindow } from '../modals/PrimaryModalWindow';
import { getMyNotifications } from '@/services/notifications/getMyNotifications';
import { RequestState } from '@/types/RequestState';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { WithId } from '@/types/WithId';
import { NotificationIcon } from '../icons/NotificationIcon';
import { Notification } from '@/types/Notification';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { NotificationCard } from './NotificationCard';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

export function NotificationsModal({ isOpen, setIsOpen, unreadCount, setUnreadCount }: Props) {
  const [notifications, setNotifications] = useState<WithId<Notification>[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const notificationsResponse = await getMyNotifications();
        setNotifications(notificationsResponse);
        setUnreadCount(
          notificationsResponse.filter((notification) => notification.isRead === false).length
        );
      } catch (error: any) {
        console.log(error);
        if (error instanceof UnauthorizedError) {
          handleLogout();
        }
      }
    }

    loadNotifications();
  }, [isOpen, unreadCount]);

  const renderNotifications = notifications.map((notification, index) => {
    return (
      <NotificationCard
        key={index}
        notificationData={notification}
        decreaceUnreadCount={() => setUnreadCount(unreadCount - 1)}
      />
    );
  });

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[8%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[70%] min-lg:w-[560px] h-[82vh] min-lg:h-[65vh] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col justify-start w-full h-full gap-[24px] overflow-auto p-[24px]">
          <div className="flex items-center gap-[16px]">
            <h2>Notificações</h2>
            <div className="flex justify-center items-center size-[32px] bg-color-primary-light rounded-md ">
              <span className="text-color-white">{unreadCount}</span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center w-full h-full gap-[24px] overflow-auto py-[24px]">
            {renderNotifications}
          </div>
        </div>
      </PrimaryModalWindow>
    )
  );
}
