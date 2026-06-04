import { Button } from '@/components/ui/Button/Button';

interface Props {
  deadlinesCount: number;
  openCreateModal: () => void;
}

export function DeadlineModalHeader({ deadlinesCount, openCreateModal }: Props) {
  return (
    <div className="flex flex-col min-lg:flex-row min-lg:items-center p-[24px] border-divider gap-[16px] min-lg:gap-0">
      <span className="font-bold">Prazos ({deadlinesCount})</span>
      <Button
        onClick={openCreateModal}
        className="border border-black bg-color-white hover:brightness-95 min-lg:ml-auto"
      >
        Adicionar Prazo
      </Button>
    </div>
  );
}
