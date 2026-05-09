'use case';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PrimaryModal } from '../ui/Modal/PrimaryModal';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { Button } from '../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';
import { updateUser } from '@/services/users/updateUser';
import { SafeUser } from '@/types/SafeUser';
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

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedCaseId: string | null;
  loadCases: Function;
}

export function UpdateCaseModal({ loadCases, isOpen, setIsOpen, selectedCaseId }: Props) {
  const [caseData, setCaseData] = useState<WithId<Case> | null>(null);
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  async function getUser() {
    try {
      const data = await getCaseById(selectedCaseId || '');
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
      const data = await updateCaseById(selectedCaseId || '', formData);
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
    if (!isOpen) return;
    getUser();

    return () => {
      setRequestState(null);
      setCaseData(null);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <PrimaryModal
        additionalStyles={
          'fixed z-99999999999 top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setRequestState(null);
          setCaseData(null);
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full bg-color-white items-center p-[16px]">
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
              <InputWithLabel id="description-input" name="description" label="Description" />
            </div>

            <div className="flex justify-end w-full bg-black min-md:w-[200px]  min-md:ml-auto">
              <Button
                width="100%"
                backgroundColor="var(--primary-color)"
                textColor="var(--white-color)"
                fontSize="1.2rem"
              >
                Confirmar Alterações
              </Button>
            </div>
          </form>
        </div>
      </PrimaryModal>
    )
  );
}
