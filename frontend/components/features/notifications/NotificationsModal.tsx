'use client';
import { useEffect, useState } from 'react';
import { BaseModal } from '../../ui/Modal/BaseModal';
import { getMyNotifications } from '@/services/notifications/getMyNotifications';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { WithId } from '@/types/WithId';
import { Notification } from '@/types/Notification';
import { NotificationsList } from './NotificationsList';
import { Button } from '@/components/ui/Button/Button';
import { useNotificationsModalContext } from '@/hooks/useNotificationsModalContext';
import { Page } from '@/types/Page';
import { RequestState } from '@/types/RequestState';
import { ButtonWithLoadingEffect } from '@/components/ui/ButtonWithLoadingEffect';

export function NotificationsModal() {
  const [requestState, setRequestState] = useState<RequestState<Page<WithId<Notification>>>>({
    status: 'idle',
  });
  const [notifications, setNotifications] = useState<WithId<Notification>[]>([]);
  const [nextPage, setNextPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const { isOpen, setIsOpen, unreadCount, setUnreadCount } = useNotificationsModalContext();

  useEffect(() => {
    async function loadNotifications() {
      const response = await getMyNotifications(1, 4);

      if (!response.success) {
        setRequestState({ ...response, status: 'error' });
        return;
      }

      const { data } = response;
      setNotifications(data.items);
      setTotalPages(data.meta.totalPages);
      setUnreadCount(
        (prev) => data.items.filter((notification) => !notification.isRead).length + prev
      );
      setRequestState({ status: 'ok', data: response.data });
    }

    loadNotifications();

    const interval = setInterval(() => {
      if (!isOpen) {
        loadNotifications();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      setRequestState({ status: 'idle' });
      setUnreadCount(0);
      setNextPage(2);
    };
  }, [isOpen]);

  async function loadMore() {
    if (nextPage > totalPages) return;
    setRequestState({ status: 'loading' });

    const response = await getMyNotifications(nextPage, 4);
    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
      return;
    }

    const { items } = response.data;
    setNotifications((prev) => [...prev, ...items]);
    setRequestState({ status: 'ok', data: response.data });
    setUnreadCount((prev) => items.filter((notification) => !notification.isRead).length + prev);
    setNextPage((prev) => prev + 1);
  }

  return (
    isOpen && (
      <BaseModal
        title="Notificações"
        omitFooter={true}
        className={'w-[90%] min-md:w-[70%] min-lg:w-[560px]'}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col w-full h-[56vh] gap-[24px] overflow-auto">
          <div className="flex items-center gap-[16px] w-full pl-[16px] pt-[16px]">
            <h3>Não lidas:</h3>
            <div className="flex justify-center items-center size-[32px] bg-color-primary-light rounded-md ">
              <span className="text-color-white">{unreadCount}</span>
            </div>
          </div>
          <NotificationsList
            notifications={notifications}
            unreadCount={unreadCount}
            setUnreadCount={setUnreadCount}
          />
          <div className="px-[16px] pb-[16px]">
            <ButtonWithLoadingEffect
              className="w-full"
              onClick={loadMore}
              isLoading={requestState.status === 'loading'}
              label="Carregar mais"
              loadingLabel="Carregando"
            />
          </div>
        </div>
      </BaseModal>
    )
  );
}
