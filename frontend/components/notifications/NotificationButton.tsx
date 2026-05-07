'use client';

import { NotificationIcon } from '../icons/NotificationIcon';

interface Props {
  openModal: Function;
}

export function NotificationButton({ openModal }: Props) {
  return (
    <button
      onClick={() => openModal()}
      className="flex justify-center items-center fixed bottom-[112px] right-[24px] size-[64px] rounded-full bg-color-primary-light cursor-pointer hover:brightness-110 inner-shadow-soft-white"
    >
      <NotificationIcon width="50%" height="50%" color="white" />
    </button>
  );
}
