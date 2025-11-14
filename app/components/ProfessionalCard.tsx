import { ReactNode } from 'react';
import { IconCircle } from './IconCircle';

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

  function renderSpecializations(): ReactNode {
    return specializations.map((specialization, index) => {
      return <IconCircle key={`${index}-professional-specialization`} iconPath={`icons/${specialization}.svg`} additionalStyles="size-[56px]" />;
    });
  }
  return (
    <article className="flex shrink-0 flex-col bg-[#4D3B00] w-[1016px] h-[440px] rounded-xl overflow-hidden border border-[var(--secondary-color)]">
      <main className="flex">
        <aside>
          <img className="size-[224px] m-[24px] rounded-xl" src={imagePath} alt="" />
        </aside>
        <div className="flex flex-col gap-[16px]  ml-[16px]">
          <h3 className="text-3xl font-bold text-color-secondary mt-[32px]">{title}</h3>
          <p className="w-[650px]">{description}</p>
        </div>
      </main>
      <footer className="flex flex-1 border-t border-[var(--secondary-color)]">
        <div className="flex flex-col border-r border-[var(--secondary-color)] h-full w-[50%] p-[24px]">
          <h4 className="font-bold">Especialidades</h4>
          <span className="flex items-center gap-[24px] mt-auto">{renderSpecializations()}</span>
        </div>
        <div className="flex flex-col h-full w-[50%] p-[24px]">
          <h4 className="font-bold">Contato</h4>
          <span className="flex items-center gap-[24px] mt-auto">
            <a href={emailLink}>
              <img className="size-[56px]" src="icons/email.svg" alt="" />
            </a>
            <a href={whatsAppLink}>
              <img className="size-[48px]" src="icons/whatsApp.svg" alt="" />
            </a>
          </span>
        </div>
      </footer>
    </article>
  );
}
