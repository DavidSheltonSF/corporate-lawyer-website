'use client';
import { NotificationButton } from './NotificationButton';
import { NotificationsModal } from './NotificationsModal';
import { NotificationsModalProvider } from '@/contexts/modals/NotificationsModalProvider';

export function Notifications() {
  return (
    <>
      <NotificationsModalProvider>
        <NotificationsModal/>
        <NotificationButton />
      </NotificationsModalProvider>
    </>
  );
}
