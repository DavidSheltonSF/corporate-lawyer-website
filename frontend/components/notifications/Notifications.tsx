'use client';

import { useState } from 'react';
import { NotificationButton } from './NotificationButton';
import { NotificationsModal } from './NotificationsModal';

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <NotificationsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <NotificationButton openModal={openModal} />
    </>
  );
}
