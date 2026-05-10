'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from '../../ui/Modal/PrimaryModal';
import { getMyNotifications } from '@/services/notifications/getMyNotifications';
import { RequestState } from '@/types/RequestState';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { WithId } from '@/types/WithId';
import { NotificationIcon } from '../../icons/NotificationIcon';
import { Notification } from '@/types/Notification';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { NotificationCard } from './NotificationCard';
import { NotificationsList } from './NotificationsList';
import { Button } from '@/components/ui/Button/Button';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

export function NotificationsModal({ isOpen, setIsOpen, unreadCount, setUnreadCount }: Props) {
  const [notifications, setNotifications] = useState<WithId<Notification>[]>([]);
  const [nextPage, setNextPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function loadNotifications() {
      try {
        setNotifications([]);
        const response = await getMyNotifications(1, 4);
        const data = response.data;
        setNotifications(data);
        setTotalPages(response.meta.totalPages);
        setUnreadCount(data.filter((notification) => !notification.isRead).length);
      } catch (error: any) {
        console.log(error);
        if (error instanceof UnauthorizedError) {
          handleLogout();
        }
      }
    }

    loadNotifications();

    const interval = setInterval(() => {
      if(!isOpen){
        loadNotifications();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      setNotifications([]);
      setNextPage(2);
    };
  }, [isOpen]);

  async function loadMore() {
    try {
      if (nextPage > totalPages) return;
      const response = await getMyNotifications(nextPage, 4);
      const data = response.data;
      setNotifications((prev) => [...prev, ...data]);

      setUnreadCount((prev) => data.filter((notification) => !notification.isRead).length + prev);
      setNextPage((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  return (
    isOpen && (
      <PrimaryModal
        additionalStyles={
          'fixed z-99999999999 top-[8%] left-1/2 translate-x-[-50%] w-[90%] min-md:w-[70%] min-lg:w-[560px] h-[82vh] min-lg:h-[65vh] rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex w-full h-full overflow-auto">
          <div className="flex flex-col w-full h-full gap-[24px] overflow-auto p-[24px]">
            <div className="flex items-center gap-[16px] w-full">
              <h2>Notificações</h2>
              <div className="flex justify-center items-center size-[32px] bg-color-primary-light rounded-md ">
                <span className="text-color-white">{unreadCount}</span>
              </div>
            </div>
            <NotificationsList
              notifications={notifications}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
            <Button
              backgroundColor="var(--primary-color)"
              paddingY="8px"
              textColor="var(--white-color)"
              width="100%"
              onclick={loadMore}
            >
              Carregar Mais
            </Button>
          </div>
        </div>
      </PrimaryModal>
    )
  );
}
