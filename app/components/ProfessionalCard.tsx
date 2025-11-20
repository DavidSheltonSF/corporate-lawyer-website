import { ReactNode, useContext } from 'react';
import { IconCircle } from './IconCircle';
import { ModalContext } from '../contexts/ModalContext';

interface ProfessionalCardProps {
  imagePath: string;
  title: string;
  description: string;
  specializations: string[];
  emailLink: string;
  whatsAppLink: string;
}

export function ProfessionalCard(props: ProfessionalCardProps) {
  const { imagePath, title, description, specializations, emailLink, whatsAppLink } = props;

  const { setModalIsOpen, setServiceAreaId } = useContext<any | null>(ModalContext);

  function renderSpecializations(): ReactNode {
    return specializations.map((specialization, index) => {
      return (
        <IconCircle
          key={`${index}-professional-specialization`}
          serviceAreaId={specialization}
          additionalStyles="size-[56px] lg:size-[48px]"
        />
      );
    });
  }
  return (
    <article className="flex self-center lg:self-start flex-col items-between justify-center bg-[#4D3B00] w-full md:w-[70%] lg:w-[760px] rounded-xl border border-[var(--secondary-color)] ">
      <main className="flex flex-col lg:flex-row">
        <div className="flex justify-center items-center lg:h-full p-[16px]">
          <img className="size-full lg:size-[192px] rounded-xl" src={imagePath} alt="" />
        </div>
        <div className="flex lg:w-[70%] flex-col gap-[8px] px-[16px] pb-[16px]">
          <h3 className="text-2xl lg:mt-[24px] font-bold text-color-secondary">{title}</h3>
          <p className="w-full text-base">{description}</p>
        </div>
      </main>
      <footer className="flex h-fit border-t border-[var(--secondary-color)] md:text-xl">
        <div className="hidden md:flex flex-col gap-[16px] border-r border-[var(--secondary-color)] w-[50%] pl-[16px] py-[8px]">
          <h4 className="font-bold">Especialidades</h4>
          <span className="flex items-center gap-[16px]">{renderSpecializations()}</span>
        </div>
        <div className="flex md:flex-col gap-[16px] px-[16px] py-[8px] w-full md:w-[50%]">
          <h4 className="hidden md:block font-bold">Contato</h4>
          <span className="flex gap-[16px] m-auto md:ml-0 items-center">
            <a href={emailLink}>
              <img className="size-[56px] lg:size-[48px]" src="icons/email.svg" alt="" />
            </a>
            <a href={whatsAppLink}>
              <img className="size-[48px] lg:size-[42px]" src="icons/whatsApp.svg" alt="" />
            </a>
          </span>
        </div>
      </footer>
    </article>
  );
}
