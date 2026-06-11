import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { Button } from '@/components/ui/Button/Button';
import { Tooltip } from '@/components/ui/Toltip/Tooltip';

interface Props {
  openClientCasesModal: () => void;
}

export function ClientModalFooter({ openClientCasesModal }: Props) {
  return (
    <footer className="flex gap-[16px] p-[24px]">
      <Tooltip label="Processos">
        <Button
          onClick={openClientCasesModal}
          className="bg-color-white hover:brightness-95 p-[8px]"
        >
          <DocumentIcon className="size-[24px]" />
        </Button>
      </Tooltip>
    </footer>
  );
}
