import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Button } from './ui/Button/Button';

interface Props {
  whatsAppNumber?: string;
}

export function WhatsAppButton({ whatsAppNumber }: Props) {
  return (
    <Button className="fixed right-[24px] bottom-[24px] size-[64px] bg-green-400 rounded-full p-0">
      <a
        className="flex size-full items-center justify-center"
        href={`https://wa.me/${whatsAppNumber}`}
        target="_blank"
      >
        <WhatsAppIcon
          className="fill-color-white size-[65%]"
          label="Envie uma mensagem no WhatsApp"
        />
      </a>
    </Button>
  );
}
