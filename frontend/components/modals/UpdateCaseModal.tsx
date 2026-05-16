'use case';
import { useEffect, useState } from 'react';
import { PrimaryModal } from '../ui/Modal/PrimaryModal';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { Button } from '../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { getCaseById } from '@/services/cases/getCaseById';
import { WithId } from '@/types/WithId';
import { Case } from '@/types/Case';
import { updateCaseById } from '@/services/cases/updateCaseById';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { DropdownInputWithLabel } from '../ui/Input/DropdownInputWithLabel';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { BrazilState } from '@/types/BrazilState';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CityLabel } from '@/lib/CityLabel';
import { City } from '@/types/City';
import { ShowSkeletonOnLoading } from '../ui/ShowSkeletonOnLoading';
import { LoadingModalScreeen } from '../ui/Modal/LoadingModalScreen';

interface Props {
  data: { caseId: string; loadCases: () => void };
  close: () => void;
}

export function UpdateCaseModal({ data, close }: Props) {
  const [caseData, setCaseData] = useState<WithId<Case> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const { caseId, loadCases } = data;

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
      loadCases();
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
        'top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-[90%] min-lg:h-fit'
      }
      closeModal={close}
    >
      <ShowSkeletonOnLoading isLoading={isLoading} Skeleton={LoadingModalScreeen}>
        <div className="flex flex-col h-fit bg-color-white items-center p-[16px]">
          <div className="">
            <h2>Alterar Processo</h2>
          </div>
          <div className="flex justify-center items-center h-[40px] w-full">
            <RequestFeedback requestState={requestState} />
          </div>
          <form className="flex flex-col gap-[16px] w-full h-full" action={alterCase}>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel
                id="title-input"
                name="title"
                label="Título"
                defaultValue={caseData?.title}
              />
              <InputWithLabel
                id="process-number-input"
                name="processNumber"
                label="Número do Processo"
                defaultValue={caseData?.processNumber}
              />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel
                id="court-input"
                name="court"
                label="Tribunal"
                defaultValue={caseData?.court}
              />
              <InputWithLabel
                id="court-division-input"
                name="courtDivision"
                label="Vara"
                defaultValue={caseData?.courtDivision}
              />
              <DropdownInputWithLabel
                id="status-input"
                name="status"
                label="Status"
                itemsRecord={CaseStatusEnum}
                itemLabel={(item: CaseStatusEnum) => CaseStatusLabel[item]}
                defaultValue={caseData?.status}
              />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <DropdownInputWithLabel
                id="estado-input"
                name="state"
                label="Estado"
                itemsRecord={BrazilState}
                itemLabel={(item: BrazilState) => BrazilStateLabel[item]}
                defaultValue={caseData?.location.state}
              />
              <DropdownInputWithLabel
                id="city-input"
                name="city"
                label="Cidade"
                itemsRecord={City}
                itemLabel={(item: City) => CityLabel[item]}
                defaultValue={caseData?.location.city}
              />
            </div>
            <div>
              <InputWithLabel
                id="description-input"
                name="description"
                label="Description"
                defaultValue={caseData?.description}
              />
            </div>

            <div className="flex justify-end w-full min-md:w-[200px]  min-md:ml-auto">
              <Button className="w-full bg-color-white text-color-white">
                Confirmar Alterações
              </Button>
            </div>
          </form>
        </div>
      </ShowSkeletonOnLoading>
    </PrimaryModal>
  );
}
