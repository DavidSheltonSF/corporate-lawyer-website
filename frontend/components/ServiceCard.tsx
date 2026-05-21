import { IconCircle } from './IconCircle';
import { ServiceModalProps } from '../types/ServiceModalProps';
import { Tooltip } from './ui/Toltip/Tooltip';
import { WithId } from '@/types/WithId';

interface Props {
  serviceDetails: WithId<ServiceModalProps>;
}

export function ServiceCard({ serviceDetails }: Props) {
  const { id, title, description } = serviceDetails;

  return (
    <article className="flex flex-col w-full h-[440px] lg:h-auto lg:w-[80%] shrink-0 group">
      <header className="flex justify-center">
        <Tooltip
          label={`Serviços - ${title}`}
          tooltipLabelProps={{
            position: {
              bottom: '120%',
              left: '50%',
              translateX: '-50%',
            },
            fontSize: '24px',
            color: 'var(--secondary-color)',
          }}
        >
          <IconCircle serviceAreaId={id} additionalStyles="size-[116px]" />
        </Tooltip>
      </header>
      <main className="flex flex-col items-center text-center gap-[16px]">
        <h1 className="font-bold mt-[16px]">{title}</h1>
        <p className="w-[92%] lg:w-auto ">{description}</p>
      </main>
    </article>
  );
}
