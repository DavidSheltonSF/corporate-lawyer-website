'use case';
import { useEffect, useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
import { InputWithLabel } from '../../../ui/Input/InputWithLabel';
import { Button } from '../../../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../../../ui/Feedback/RequestFeedback';
import { getCaseById } from '@/services/cases/getCaseById';
import { WithId } from '@/types/WithId';
import { Case } from '@/types/Case';
import { updateCaseById } from '@/services/cases/updateCaseById';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { DropdownInputWithLabel } from '../../../ui/Input/DropdownInputWithLabel';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { BrazilState } from '@/types/BrazilState';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CityLabel } from '@/lib/CityLabel';
import { City } from '@/types/City';
import { ShowSkeletonOnLoading } from '../../../ui/ShowSkeletonOnLoading';
import { LoadingModalScreeen } from '../../../ui/Modal/LoadingModalScreen';
import { UpdateCaseModalHeader } from './UpdateCaseModalHeader';
import { UpdateCaseModalForm } from './UpdateCaseModalForm';

interface Props {
  data: { caseId: string; refetchCases: () => void };
  close: () => void;
}

UpdateCaseModal.Header = UpdateCaseModalHeader;
UpdateCaseModal.Form = UpdateCaseModalForm

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


  return (
    <PrimaryModal
      additionalStyles={
        'top-[6%] min-lg:top-[1%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-[70vh] min-lg:h-fit'
      }
      closeModal={close}
    >
      <ShowSkeletonOnLoading isLoading={isLoading} Skeleton={LoadingModalScreeen}>
        <div className="flex flex-col size-full bg-color-white items-center p-[16px]">
          <UpdateCaseModal.Header requestState={requestState}/>
          <UpdateCaseModal.Form caseData={caseData} action={alterCase}/>
        </div>
      </ShowSkeletonOnLoading>
    </PrimaryModal>
  );
}
