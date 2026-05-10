import { createContext, Dispatch, SetStateAction } from 'react';
import { ModalContextType } from './ModalContextType';

export type NotificationsModalContext = ModalContextType & {unreadCount: number, setUnreadCount: Dispatch<SetStateAction<number>>}
export const NotificationsModalContext = createContext<NotificationsModalContext | undefined>(undefined);
