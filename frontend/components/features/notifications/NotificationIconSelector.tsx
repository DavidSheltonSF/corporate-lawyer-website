import { AddIcon } from '@/components/icons/AddIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { NotificationIcon } from '@/components/icons/NotificationIcon';
import { UpdateIcon } from '@/components/icons/UpdateIcon';
import { NotificationType } from '@/types/NotificationType';

interface Props {
  notificationType: string;
}

export function NotificationIconSelector({ notificationType }: Props) {
  const styles = 'size-[60%] stroke-[var(--color-primary-light)]';
  switch (notificationType) {
    case NotificationType.CREATED:
      return <AddIcon className={styles} />;

    case NotificationType.UPDATED:
      return <UpdateIcon className={styles} />;

    case NotificationType.DELETED:
      return <DeleteIcon className={styles} />;

    default:
      return <NotificationIcon className={styles} />;
  }
}
