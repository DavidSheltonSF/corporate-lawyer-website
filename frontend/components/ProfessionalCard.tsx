import { ReactNode } from 'react';
import { IconCircle } from './IconCircle';
import { Tooltip } from './ui/Toltip/Tooltip';
import { EmailIcon } from './icons/EmailIcon';

export interface ProfessionalCardProps {
  imagePath: string;
  imageAlternativeText?: string;
  title: string;
  description: string;
  specializations: string[];
  email: string;
  whatsAppNumber: string;
}

export function ProfessionalCard(props: ProfessionalCardProps) {
  const {
    imagePath,
    imageAlternativeText,
    title,
    description,
    specializations,
    email,
    whatsAppNumber,
  } = props;

  function renderSpecializations(): ReactNode {
    return specializations.map((specialization, index) => {
      return (
        <Tooltip
          key={index}
          label={specialization}
          tooltipLabelProps={{
            position: {
              bottom: '120%',
              left: '50%',
              translateX: '-50%',
            },
            backgroundColor: '#000',
            fontSize: '16px',
          }}
        >
          <IconCircle
            key={index}
            serviceAreaId={specialization}
            additionalStyles="size-[56px] lg:size-[48px]"
          />
        </Tooltip>
      );
    });
  }
  return (
    <article className="flex self-center lg:self-start flex-col items-between justify-center bg-[#4D3B00] w-full md:w-[70%] lg:w-[760px] rounded-xl border border-[var(--secondary-color)] ">
      <main className="flex flex-col lg:flex-row">
        <div className="flex justify-center items-center lg:h-full p-[16px]">
          <img
            className="size-full lg:size-[192px] rounded-xl"
            src={imagePath}
            alt={imageAlternativeText}
          />
        </div>
        <div className="flex lg:w-[70%] flex-col gap-[8px] px-[16px] pb-[16px]">
          <h3 className=" lg:mt-[24px] font-bold text-color-secondary">{title}</h3>
          <p className="w-full">{description}</p>
        </div>
      </main>
      <footer className="flex h-fit border-t border-[var(--secondary-color)]">
        <div className="hidden md:flex flex-col gap-[16px] border-r border-[var(--secondary-color)] w-[50%] pl-[16px] py-[8px]">
          <h4 className="font-bold">Especialidades</h4>
          <span className="flex items-center gap-[16px]">{renderSpecializations()}</span>
        </div>
        <div className="flex md:flex-col gap-[16px] px-[16px] py-[8px] w-full md:w-[50%]">
          <h4 className="hidden md:block font-bold">Contato</h4>
          <span className="flex gap-[16px] m-auto md:ml-0 items-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}?su=Solicitação de apoio jurídico`}
              target="_blank"
            >
              <EmailIcon label={`Envie um email para ${title}`} className="size-[56px]" />
            </a>
            <a href={`https://wa.me/5521969470527`} target="_blank">
              <img
                className="size-[48px] lg:size-[42px]"
                src="icons/whatsApp.svg"
                alt={`Envie uma mensagem no WhatsApp para ${title} `}
              />
            </a>
          </span>
        </div>
      </footer>
    </article>
  );
}
