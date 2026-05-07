'use client';

import { useState } from 'react';
import { NotificationButton } from './NotificationButton';
import { NotificationsModal } from './NotificationsModal';

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <NotificationsModal isOpen={isOpen} setIsOpen={setIsOpen} setUnreadCount={setUnreadCount} unreadCount={unreadCount}  />
      <NotificationButton openModal={openModal} unreadCount={unreadCount} />
    </>
  );
}
