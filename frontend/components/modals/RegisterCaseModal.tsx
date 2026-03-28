'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { PrimaryModalWindow } from './PrimaryModalWindow';
import { InputWithLabel } from '../form/InputWithLabel';
import { Button } from '../Button';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../form/RequestFeedback';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { MissingContextError } from '@/errors/MissingContextError';
import { createCase } from '@/services/createCase';
interface Props {
  selectedClientId: string | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export function RegisterCaseModal({ isOpen, setIsOpen, selectedClientId }: Props) {
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
    }
  }

  return (
    isOpen && (
      <PrimaryModalWindow
        additionalStyles={
          'fixed z-99999999999 top-[2%] min-lg:top-[10%] left-1/2 translate-x-[-50%] w-[90%] min-lg:w-[678px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black] text-color-black'
        }
        closeModal={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col size-full bg-color-white items-center p-[16px]">
          <div className="flex justify-center items-center h-[40px] w-full">
            <RequestFeedback requestState={requestState} />
          </div>
          <form className="flex flex-col gap-[16px] w-full h-full" action={registerCase}>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel id="title-input" name="title" label="Titulo" />
              <InputWithLabel
                id="process-number-input"
                name="processNumber"
                label="Número do Processo"
              />
            </div>
            <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
              <InputWithLabel id="court-input" name="court" label="Tribunal" />
              <InputWithLabel id="court-division-input" name="courtDivision" label="Vara" />
              <InputWithLabel id="status-input" name="status" label="Status" />
            </div>
            <div>
              <InputWithLabel id="description-input" name="description" label="Descrição" />
            </div>

            <div className="w-full min-lg:w-[200px] min-lg:ml-auto min:lg:mt-auto">
              <Button
                paddingY="8px"
                backgroundColor="var(--primary-color)"
                textColor="var(--white-color)"
                fontSize="1.2rem"
              >
                Cadastrar Processo
              </Button>
            </div>
          </form>
        </div>
      </PrimaryModalWindow>
    )
  );
}
