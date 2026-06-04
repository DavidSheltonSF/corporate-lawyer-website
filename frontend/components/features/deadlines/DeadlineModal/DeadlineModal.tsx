import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { getCaseDeadlines } from '@/services/cases/getCaseDeadlines';
import { Deadline } from '@/types/Deadline';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { handleLogout } from '@/lib/handleLogout';
import { DeadlineModalContent } from './DeadlineModalContent';
import { DeadlineModalSkeleton } from './DeadlineModalSkeleton';
import { CreateDeadlineModal } from '../CreateDeadlineModal/CreateDeadlineModal';

interface Props {
  caseId: string;
}

DeadlineModal.Content = DeadlineModalContent;
DeadlineModal.Skeleton = DeadlineModalSkeleton;

export function DeadlineModal({ payload, close }: GlobalModalProps<Props>) {
  const { caseId } = payload;
  const [requestState, setRequestState] = useState<RequestState<WithId<Deadline>[]>>({
    status: 'idle',
  });
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

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
    className: 'w-[90%] h-[90vh] min-lg:h-[60vh] min-md:w-[60%] min-lg:w-[640px] overflow-hidden',
    title: 'Prazos',
    onClose: close,
  };

  function renderContent() {
    switch (requestState.status) {
      case 'loading':
        return <DeadlineModal.Skeleton />;

      case 'ok':
        const { data } = requestState;
        return (
          <DeadlineModal.Content data={data} openCreateModal={() => setCreateModalIsOpen(true)} />
        );
    }
  }

  if (createModalIsOpen) {
    return (
      <CreateDeadlineModal
        caseId={caseId}
        close={() => setCreateModalIsOpen(false)}
        refetchDeadlines={fetchDeadlines}
      />
    );
  }

  return (
    <BaseModal omitFooter={true} {...BaseModalProps}>
      {renderContent()}
    </BaseModal>
  );
}
