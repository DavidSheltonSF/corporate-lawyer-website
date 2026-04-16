import { IconCircle } from './IconCircle';
import { ServiceModalProps } from '../types/ServiceModalProps';
import { TooltipContainer } from './TooltipContainer';
import { WithId } from '@/types/WithId';

interface Props {
  serviceDetails: WithId<ServiceModalProps>;
}

export function ServiceCard({ serviceDetails }: Props) {
  const { id, title, description } = serviceDetails;

  return (
    <article className="flex flex-col w-full h-[440px] lg:h-auto lg:w-[80%] shrink-0 group">
      <header className="flex justify-center">
        <TooltipContainer
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
        </TooltipContainer>
      </header>
      <main className="flex flex-col items-center text-center gap-[16px]">
        <h1 className="text-3xl font-bold mt-[16px]">{title}</h1>
        <p className="w-[92%] lg:w-auto ">{description}</p>
      </main>
    </article>
  );
}
