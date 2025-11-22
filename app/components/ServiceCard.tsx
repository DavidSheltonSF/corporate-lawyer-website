import { useState } from 'react';
import { IconCircle } from './IconCircle';
import { ServiceDetails } from '../types/ServiceDetails';
import { TooltipContainer } from './TooltipContainer';

interface Props {
  serviceDetails: ServiceDetails;
}

export function ServiceCard({ serviceDetails }: Props) {
  const [isOver, setIsOver] = useState(false);

  function handleMouseOver() {
    setIsOver(true);
  }

  function handleMouseLeave() {
    setIsOver(false);
  }

  const { id, title, description, services } = serviceDetails;

  return (
    <article
      className="flex flex-col w-full h-[440px] lg:h-auto lg:w-[80%] shrink-0"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <header className="flex justify-center">
        <TooltipContainer
          label={`Serviços - ${title}`}
          tooltipLabelProps={{
            position: 'top',
            fontSize: '24px',
            color: 'var(--secondary-color)',
          }}
        >
          <IconCircle serviceAreaId={id} additionalStyles="size-[116px]" isOverParent={isOver} />
        </TooltipContainer>
      </header>
      <main className="flex flex-col items-center text-center gap-[16px]">
        <h1 className="text-3xl lfont-bold mt-[16px]">{title}</h1>
        <p className="w-[92%] lg:w-auto text-xl">{description}</p>
      </main>
    </article>
  );
}
