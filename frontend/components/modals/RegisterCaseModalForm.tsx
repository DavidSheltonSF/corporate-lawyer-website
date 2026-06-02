import { useCurrentUserId } from '@/hooks/auth/useCurrentUserId';
import { SubmitButton } from '../SubmitButton';
import { Button } from '../ui/Button/Button';
import { DropdownInputWithLabel } from '../ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '../ui/Input/InputWithLabel';
import { RequestState } from '@/types/RequestState';
import { useState } from 'react';
import { createCase } from '@/services/cases/createCase';

interface Props {
  formId: string;
  clientId: string;
}

export function RegisterCaseModalForm({ formId, clientId }: Props) {
  const [requestState, setRequestState] = useState<RequestState | null>(null);

  const userId = useCurrentUserId();

  async function registerCase(formData: FormData) {
    try {
      const data = await createCase(clientId, userId, formData);
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
    <form className="flex flex-col gap-[16px] w-ful]" action={registerCase}>
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <InputWithLabel id="title-input" name="title" label="Título" />
        <InputWithLabel id="process-number-input" name="processNumber" label="Número do Processo" />
      </div>
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <InputWithLabel id="court-input" name="court" label="Tribunal" />
        <InputWithLabel id="court-division-input" name="courtDivision" label="Vara" />
        <DropdownInputWithLabel
          id="status-input"
          name="status"
          label="Status"
          itemLabel={CaseStatusLabel}
        />
      </div>
      <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
        <DropdownInputWithLabel
          id="estado-input"
          name="state"
          label="Estado"
          itemLabel={BrazilStateLabel}
        />
        <DropdownInputWithLabel id="city-input" name="city" label="Cidade" itemLabel={CityLabel} />
      </div>
      <div>
        <InputWithLabel id="description-input" name="description" label="Description" />
      </div>

      <div className="flex justify-end w-full min-md:w-[200px]  min-md:ml-auto">
        <Button variant={ButtonVariant.PRIMARY} className="w-full">
          Confirmar Alterações
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
