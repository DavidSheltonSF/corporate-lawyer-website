'use case';
import { useEffect, useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
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

interface Props {
  data: { caseId: string; refetchCases: () => void };
  close: () => void;
}

UpdateCaseModal.Header = UpdateCaseModalHeader;
UpdateCaseModal.Form = UpdateCaseModalForm;

export function UpdateCaseModal({ data, close }: Props) {
  const [caseData, setCaseData] = useState<WithId<Case> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const { caseId, refetchCases } = data;

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
    <PrimaryModal
      title="Editar Processo"
      formId={formId}
      className={
        'top-[6%] min-lg:top-[1%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-[70vh] min-lg:h-fit'
      }
      onClose={close}
    >
      <ShowSkeletonOnLoading isLoading={isLoading} Skeleton={LoadingModalScreeen}>
        <div className="flex flex-col h-fit p-[16px]">
          <UpdateCaseModal.Header requestState={requestState} />
          <UpdateCaseModal.Form formId={formId} caseData={caseData} action={alterCase} />
        </div>
      </ShowSkeletonOnLoading>
    </PrimaryModal>
  );
}
