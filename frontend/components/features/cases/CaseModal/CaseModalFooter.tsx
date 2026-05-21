import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { Button } from '@/components/ui/Button/Button';
import { Tooltip } from '@/components/ui/Toltip/Tooltip';

interface Props {
  openFilesModal: () => void;
}

export function CaseModalFooter({ openFilesModal }: Props) {
  return (
    <footer className="py-[8px] px-[24px]">
      <Tooltip label="Arquivos">
        <Button onClick={openFilesModal} className="bg-color-white hover:brightness-95 p-[8px]">
          <DocumentIcon className="size-[24px]" />
        </Button>
      </Tooltip>
    </footer>
  );
}
