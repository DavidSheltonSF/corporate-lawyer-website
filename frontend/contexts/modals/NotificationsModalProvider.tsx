import { useState } from 'react';
import { NotificationsModalContext } from './NotificationsModalContext';

interface Props {
  children: React.ReactNode;
}

export function NotificationsModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <NotificationsModalContext.Provider value={{ isOpen, setIsOpen, unreadCount, setUnreadCount }}>
      {children}
    </NotificationsModalContext.Provider>
  );
}
