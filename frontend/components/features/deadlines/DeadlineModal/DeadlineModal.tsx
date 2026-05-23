import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { getCaseDeadlines } from '@/services/cases/getCaseDeadlines';
import { Deadline } from '@/types/Deadline';
import { Button } from '@/components/ui/Button/Button';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';
import { DeadlineCard } from '../DeadLineCard/DeadlineCard';

interface Props {
  caseId: string;
}

export function DeadlineModal({ payload, close }: GlobalModalProps<Props>) {
  const { caseId } = payload;
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [deadlines, setDeadlines] = useState<WithId<Deadline>[]>([]);
  const isLoading = requestState?.status === 'loading';

  async function fetchDeadlines() {
    try {
      setRequestState({ status: 'loading' });

      const deadlinesData = await getCaseDeadlines(caseId);
      setDeadlines(deadlinesData);
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const renderDeadlines = deadlines.map((deadline) => {
    return <DeadlineCard key={deadline.id} deadline={deadline} />;
  });

  const BaseModalProps = {
    className: 'w-[90%] min-md:w-[60%] min-lg:w-[640px]',
    title: 'Prazos',
    onClose: close,
  };

  if (isLoading) {
    return (
      <BaseModal {...BaseModalProps}>
        <LoadingModalScreeen />
      </BaseModal>
    );
  }

  return (
    <BaseModal {...BaseModalProps}>
      <div className="flex flex-col max-h-[58vh]">
        <div className="flex flex-col min-lg:flex-row min-lg:items-center p-[24px] border-divider gap-[16px] min-lg:gap-0">
          <span className="font-bold">Quantidade: {deadlines.length}</span>
          <Button className="border border-black bg-color-white hover:brightness-95 min-lg:ml-auto">
            Adicionar Prazo
          </Button>
        </div>
        <div className="flex flex-col gap-[16px] border-divider p-[24px] overflow-y-auto">
          {renderDeadlines}
        </div>
      </div>
    </BaseModal>
  );
}
