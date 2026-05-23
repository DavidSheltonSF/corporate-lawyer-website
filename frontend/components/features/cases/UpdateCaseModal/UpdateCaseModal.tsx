'use case';
import { useEffect, useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { RequestState } from '@/types/RequestState';
import { getCaseById } from '@/services/cases/getCaseById';
import { WithId } from '@/types/WithId';
import { Case } from '@/types/Case';
import { updateCaseById } from '@/services/cases/updateCaseById';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { ShowSkeletonOnLoading } from '../../../ui/ShowSkeletonOnLoading';
import { LoadingModalScreeen } from '../../../ui/Modal/LoadingModalScreen';
import { UpdateCaseModalHeader } from './UpdateCaseModalHeader';
import { UpdateCaseModalForm } from './UpdateCaseModalForm';
import { GlobalModalProps } from '@/types/GlobalModalProps';

interface Props {
  caseId: string;
  refetchCases: () => void;
}

UpdateCaseModal.Header = UpdateCaseModalHeader;
UpdateCaseModal.Form = UpdateCaseModalForm;

export function UpdateCaseModal({ payload, close }: GlobalModalProps<Props>) {
  const [caseData, setCaseData] = useState<WithId<Case> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const { caseId, refetchCases } = payload;

  async function getUser() {
    try {
      setRequestState({ status: 'loading' });
      const data = await getCaseById(caseId || '');
      setCaseData(data);
      setRequestState({
        status: 'ok',
        message: `Processo carregado com sucesso.`,
      });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  async function alterCase(formData: FormData) {
    try {
      const data = await updateCaseById(caseId || '', formData);
      setRequestState({
        status: 'ok',
        message: `Processo atualizado com sucesso.`,
      });
      setCaseData(data);
      refetchCases();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    getUser();

    return () => {
      setRequestState(null);
      setCaseData(null);
    };
  }, []);

  const isLoading = requestState?.status === 'loading';
  const formId = 'update-case-form';

  return (
    <BaseModal
      title="Editar Processo"
      formId={formId}
      className={'h-[70vh] min-lg:h-fit w-[90%] min-md:w-[60%] min-lg:w-[680px]'}
      onClose={close}
    >
      <ShowSkeletonOnLoading isLoading={isLoading} Skeleton={LoadingModalScreeen}>
        <div className="flex flex-col h-[500px] min-lg:h-fit p-[24px] overflow-y-auto">
          <UpdateCaseModal.Header requestState={requestState} />
          <UpdateCaseModal.Form formId={formId} caseData={caseData} action={alterCase} />
        </div>
      </ShowSkeletonOnLoading>
    </BaseModal>
  );
}
