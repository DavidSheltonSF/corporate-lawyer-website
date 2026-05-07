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

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function NotificationsModal({ isOpen, setIsOpen }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [notifications, setNotifications] = useState<WithId<Notification>[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        setRequestState({ status: 'loading' });
        const notificationsResponse = await getMyNotifications();
        setRequestState({ status: 'ok' });
        setNotifications(notificationsResponse);
      } catch (error: any) {
        console.log(error);
        if (error instanceof UnauthorizedError) {
          handleLogout();
        }
        setRequestState({ status: 'error', message: error.message });
      }
    }

    loadNotifications();
  }, []);

  const renderNotifications = notifications.map((notification, index) => {
    return (
      <article className="flex border w-[90%] min-h-fit rounded-md p-[16px]" key={index}>
        <div className="flex size-full items-center gap-[16px]">
          <div className="flex justify-center items-center size-[56px] border rounded-md">
            <NotificationIcon width="60%" height="60%" color="var(--primary-color-light)" />
          </div>
          <div className="flex flex-col h-full w-full">
            <h3 className="font-bold">{notification.title}</h3>
            <p>{notification.message}</p>
            <p className="text-gray-500 small-text">
              {formatRelativeTime(new Date(notification.createdAt))}
            </p>
          </div>
        </div>
      </article>
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
        <div className="flex flex-col justify-start items-center w-full h-full gap-[24px] overflow-auto py-[24px]">
          {renderNotifications}
        </div>
      </PrimaryModalWindow>
    )
  );
}
