'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BaseModal } from '../ui/Modal/BaseModal';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { Button } from '../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../ui/Feedback/RequestFeedback';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { createCase } from '@/services/cases/createCase';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { DropdownInputWithLabel } from '../ui/Input/DropdownInputWithLabel';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { BrazilState } from '@/types/BrazilState';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { City } from '@/types/City';
import { CityLabel } from '@/lib/CityLabel';
import { ButtonVariant } from '../ui/Button/ButtonVariant';

interface Props {
  selectedClientId: string | null;
  isOpen: boolean;
  close: () => void;
}
export function RegisterCaseModal({ isOpen, close, selectedClientId }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  const context = useAuthenticatedUserContext();
  if (!context) {
    throw new MissingContextError('AuthenticatedUserContext');
  }

  const { userData } = context;

  async function registerCase(formData: FormData) {
    try {
      const data = await createCase(selectedClientId || '', userData.id, formData);
      setRequestState({ status: 'ok', message: `Processo registrado com sucesso` });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    return () => {
      setRequestState(null);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <BaseModal
        title="Novo Processo"
        className={'w-[90%] min-md:w-[60%] min-lg:w-[678px] h-[90%] h-fit'}
        onClose={() => {
          close();
          setRequestState(null);
        }}
      >
          <div className='flex flex-col overflow-y-auto p-[24px] h-[56vh]'>
            <RequestFeedback requestState={requestState} />
            <form className="flex flex-col gap-[16px] w-ful]" action={registerCase}>
              <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
                <InputWithLabel id="title-input" name="title" label="Título" />
                <InputWithLabel
                  id="process-number-input"
                  name="processNumber"
                  label="Número do Processo"
                />
              </div>
              <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
                <InputWithLabel id="court-input" name="court" label="Tribunal" />
                <InputWithLabel id="court-division-input" name="courtDivision" label="Vara" />
                <DropdownInputWithLabel
                  id="status-input"
                  name="status"
                  label="Status"
                  itemsRecord={CaseStatusEnum}
                  itemLabel={(item: CaseStatusEnum) => CaseStatusLabel[item]}
                />
              </div>
              <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
                <DropdownInputWithLabel
                  id="estado-input"
                  name="state"
                  label="Estado"
                  itemsRecord={BrazilState}
                  itemLabel={(item: BrazilState) => BrazilStateLabel[item]}
                />
                <DropdownInputWithLabel
                  id="city-input"
                  name="city"
                  label="Cidade"
                  itemsRecord={City}
                  itemLabel={(item: City) => CityLabel[item]}
                />
              </div>
              <div>
                <InputWithLabel id="description-input" name="description" label="Description" />
              </div>

              <div className="flex justify-end w-full min-md:w-[200px]  min-md:ml-auto">
                <Button variant={ButtonVariant.PRIMARY} className="w-full">
                  Confirmar Alterações
                </Button>
              </div>
            </form>
          </div>

      </BaseModal>
    )
  );
}
