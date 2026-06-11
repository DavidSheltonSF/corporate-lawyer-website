import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';
import { getCasesByClientId } from '@/services/cases/getCasesByClientId';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { Page } from '@/types/Page';
import { RequestState } from '@/types/RequestState';
import { WithId } from '@/types/WithId';
import { useEffect, useState } from 'react';
import { ClientCaseCard } from './ClientCaseCard';
import { Case } from '@/types/Case';
import { handleLogout } from '@/lib/handleLogout';

interface Props {
  clientId: string;
}

export function ClientCasesModal({ payload, close }: GlobalModalProps<Props>) {
  const [requestState, setRequestState] = useState<RequestState<Page<WithId<CaseWithRelations>>>>({
    status: 'idle',
  });
  const { clientId } = payload;

  useEffect(() => {
    async function fetchCases() {
      setRequestState({ status: 'loading' });

      const response = await getCasesByClientId(clientId, ['lawyers']);
      if (!response.success) {
        if (response.code === 'UNAUTHORIZES') {
          handleLogout();
        }

        setRequestState({ ...response, status: 'error' });
        return;
      }

      setRequestState({ status: 'ok', data: response.data });
    }

    fetchCases();
  }, []);

  function renderContent() {
    switch (requestState.status) {
      case 'loading':
        return <LoadingModalScreeen />;

      case 'ok':
        const { data } = requestState;
        const renderCases = data.items.map((cas) => {
          return <ClientCaseCard key={cas.id} caseData={cas} />;
        });
        return <div>{renderCases}</div>;

      default:
        break;
    }
  }

  return (
    <BaseModal
      className="min-h-[80vh] lg:max-h-[55vh] w-[90%] md:w-[60%] lg:w-[720px]"
      title="Processos do cliente"
      omitFooter={true}
      onClose={close}
    >
      {renderContent()}
    </BaseModal>
  );
}
