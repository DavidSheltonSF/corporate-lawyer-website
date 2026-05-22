import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { getCaseDeadlines } from '@/services/cases/getCaseDeadlines';
import { Card } from '@/components/ui/Card/Card';
import { Deadline } from '@/types/Deadline';
import { Button } from '@/components/ui/Button/Button';
import { formatDate } from '@/lib/formatDate';
import { DeadlineStatus } from '@/types/DeadlineStatus';
import { GlobalModalProps } from '@/types/GlobalModalProps';

interface Props {
  caseId: string;
}

export function DeadlineModal({ payload, close }: GlobalModalProps<Props>) {
  const { caseId } = payload;
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [deadlines, setDeadlines] = useState<WithId<Deadline>[]>([]);

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

  function renderDeadlineStatus(deadline: WithId<Deadline>) {
    const isExpired = deadline.status === DeadlineStatus.VENCIDO;
    if (isExpired) {
      return <p>Expirou</p>;
    }

    if (deadline.remainingDays === 0) {
      return <p>Expira hoje</p>;
    }

    return <p>Expira em {deadline.remainingDays}</p>;
  }

  const renderDeadlines = deadlines.map((deadline) => {
    return (
      <Card key={deadline.id} className="border border-black w-full p-[24px]">
        <p>{deadline.type}</p>
        {renderDeadlineStatus(deadline)}
        <p>
          {formatDate(deadline.startDate)} - {formatDate(deadline.dueDate)}
        </p>
        <p>{deadline.priority} prioridate</p>
      </Card>
    );
  });

  return (
    <BaseModal className="w-[540px]" title="Prazos" onClose={close}>
      <div className="flex flex-col max-h-[40vh]">
        <div className="flex items-center p-[24px] border-divider">
          <span className="font-bold">Quantidade: {deadlines.length}</span>
          <Button className="border border-black bg-color-white hover:brightness-95 ml-auto">
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
