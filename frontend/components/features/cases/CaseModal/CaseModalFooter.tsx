import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { Button } from '@/components/ui/Button/Button';
import { Tooltip } from '@/components/ui/Toltip/Tooltip';

interface Props {
  openFilesModal: () => void;
  openDeadlinesModal: () => void;
}

export function CaseModalFooter({ openFilesModal, openDeadlinesModal }: Props) {
  return (
    <footer className="flex gap-[16px] p-[24px]">
      <Tooltip label="Arquivos">
        <Button onClick={openFilesModal} className="bg-color-white hover:brightness-95 p-[8px]">
          <DocumentIcon className="size-[24px]" />
        </Button>
      </Tooltip>

      <Tooltip label="Prazos">
        <Button onClick={openDeadlinesModal} className="bg-color-white hover:brightness-95 p-[8px]">
          <CalendarIcon className="size-[24px]" />
        </Button>
      </Tooltip>
    </footer>
  );
}
