import { AddIcon } from '@/components/icons/AddIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { NotificationIcon } from '@/components/icons/NotificationIcon';
import { UpdateIcon } from '@/components/icons/UpdateIcon';
import { NotificationType } from '@/types/NotificationType';

interface Props {
  notificationType: string;
}

export function NotificationIconSelector({ notificationType }: Props) {
  switch (notificationType) {
    case NotificationType.CREATED:
      return <AddIcon width="60%" height="60%" color="var(--primary-color-light)" />;

    case NotificationType.UPDATED:
      return <UpdateIcon width="60%" height="60%" color="var(--primary-color-light)" />;

    case NotificationType.DELETED:
      return <DeleteIcon width="60%" height="60%" color="var(--primary-color-light)" />;

    default:
      return <NotificationIcon width="60%" height="60%" color="var(--primary-color-light)" />;
  }
}
