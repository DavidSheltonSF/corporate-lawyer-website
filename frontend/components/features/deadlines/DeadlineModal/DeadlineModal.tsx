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
import { handleLogout } from '@/lib/handleLogout';

interface Props {
  caseId: string;
}

export function DeadlineModal({ payload, close }: GlobalModalProps<Props>) {
  const { caseId } = payload;
  const [requestState, setRequestState] = useState<RequestState<WithId<Deadline>[]>>({
    status: 'idle',
  });
  const isLoading = requestState?.status === 'loading';

  async function fetchDeadlines() {
    setRequestState({ status: 'loading' });

    const response = await getCaseDeadlines(caseId);

    if (!response.success) {
      return setRequestState({ ...response, status: 'error' });
    }

    setRequestState({ status: 'ok', data: response.data });
  }

  useEffect(() => {
    fetchDeadlines();
  }, []);

  useEffect(() => {
    if (requestState.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
  }, [requestState]);

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

  function renderContent() {
    switch (requestState.status) {
      case 'loading':
        return <LoadingModalScreeen />;

      case 'ok':
        const { data } = requestState;
        const renderDeadlines = data.map((deadline) => {
          return <DeadlineCard key={deadline.id} deadline={deadline} />;
        });
        return (
          <div className="flex flex-col max-h-[58vh]">
            <div className="flex flex-col min-lg:flex-row min-lg:items-center p-[24px] border-divider gap-[16px] min-lg:gap-0">
              <span className="font-bold">Quantidade: {data.length}</span>
              <Button className="border border-black bg-color-white hover:brightness-95 min-lg:ml-auto">
                Adicionar Prazo
              </Button>
            </div>
            <div className="flex flex-col gap-[16px] border-divider p-[24px] overflow-y-auto">
              {renderDeadlines}
            </div>
          </div>
        );
    }
  }

  return <BaseModal {...BaseModalProps}>{renderContent()}</BaseModal>;
}
