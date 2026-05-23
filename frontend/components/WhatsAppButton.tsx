import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface Props {
  whatsAppNumber?: string;
}

export function WhatsAppButton({ whatsAppNumber }: Props) {
  return (
    <div className="fixed right-[24px] bottom-[24px] size-[64px] bg-green-400 rounded-full hover:brightness-120">
      <a
        className="flex size-full items-center justify-center cursor-pointer"
        href={`https://wa.me/${whatsAppNumber}`}
        target="_blank"
      >
        <WhatsAppIcon
          className="fill-color-white size-[65%]"
          label="Envie uma mensagem no WhatsApp"
        />
      </a>
    </div>
  );
}
