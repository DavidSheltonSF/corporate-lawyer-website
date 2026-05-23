import { DeadlineUrgency } from '@/types/DeadlineUrgency';
import { getDeadlineUrgency } from '../helpers/getDeadlineUrgency';
import { twMerge } from 'tailwind-merge';

interface Props {
  remainingDays: number;
}

export function RemainingDaysBadge({ remainingDays }: Props) {
  const urgency = getDeadlineUrgency(remainingDays);

  const config: Record<DeadlineUrgency, any> = {
    OVERDUE: {
      label: 'Venceu',
      className: 'bg-red-100 text-red-700',
    },

    WARNING: {
      label: `Vence em ${remainingDays} dias`,
      className: 'bg-orange-100 text-orange-700',
    },

    SAFE: {
      label: `Vence em ${remainingDays} dias`,
      className: 'bg-green-100 text-green-700',
    },
  };

  const current = config[urgency];

  const baseStyles = `w-fit p-[8px] rounded-sm font-bold`;
  const dynamicStyles = `${current.className}`;

  return <div className={twMerge(baseStyles, dynamicStyles)}>{current.label}</div>;
}
