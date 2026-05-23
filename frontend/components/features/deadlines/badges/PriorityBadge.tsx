import { twMerge } from 'tailwind-merge';
import { DeadlinePriority } from '@/types/DeadlinePriority';
import { FlagIcon } from '@/components/icons/FlagIcon';

interface Props {
  priority: string;
}

export function PriorityBadge({ priority }: Props) {
  const config: Record<string, any> = {
    ALTA: {
      label: 'Alta prioridade',
      className: 'bg-red-100 text-red-700',
    },

    MEDIA: {
      label: 'Média prioridade',
      className: 'bg-orange-100 text-orange-700',
    },

    BAIXA: {
      label: 'Baixa prioridade',
      className: 'bg-green-100 text-green-700',
    },
  };

  const current = config[priority];

  const baseStyles = `flex items-center gap-[8px] w-fit p-[8px] rounded-sm font-bold`;
  const dynamicStyles = `${current.className}`;

  return (
    <div className={twMerge(baseStyles, dynamicStyles)}>
      <FlagIcon className="size-[24px]" />
      <span>{current.label}</span>
    </div>
  );
}
