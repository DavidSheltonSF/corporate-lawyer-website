'use client';

import { Activity } from 'react';
import { NotificationIcon } from '../../icons/NotificationIcon';
import { useNotificationsModalContext } from '@/hooks/useNotificationsModalContext';

export function NotificationButton() {
  const { setIsOpen, unreadCount } = useNotificationsModalContext();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="flex justify-center items-center fixed bottom-[112px] right-[24px] size-[64px] rounded-full bg-color-primary-light cursor-pointer hover:brightness-110 inner-shadow-soft-white"
    >
      <NotificationIcon className="size-[50%] fill-color-white" />
      <Activity mode={unreadCount > 0 ? 'visible' : 'hidden'}>
        <div className="absolute size-[80%] rounded-full bg-color-primary-light top-1/2 translate-y-[-50%] animate-ping"></div>
      </Activity>
    </button>
  );
}
