import { DropdownInputWithLabel } from '@/components/ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '@/components/ui/Input/InputWithLabel';
import { ShowSkeletonOnLoading } from '@/components/ui/ShowSkeletonOnLoading';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CityLabel } from '@/lib/CityLabel';
import { handleLogout } from '@/lib/handleLogout';
import { getCaseById } from '@/services/cases/getCaseById';
import { updateCaseById } from '@/services/cases/updateCaseById';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '@/components/ui/Feedback/RequestFeedback';
import { mapLabelToCaseStatus } from '@/mapper/mapLabelToCaseStatus';
import { mapLabelToBrazilState } from '@/mapper/mapLabelToBrazilState';
import { mapLabelToCity } from '@/mapper/mapLabelToCity';
import { useForm } from '@/hooks/useForm';

interface Props {
  formId: string;
  caseId: string;
  isReadyToSubmit: boolean;
  setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
  refetchCases: () => void;
}

export function UpdateCaseModalForm({
  formId,
  caseId,
  refetchCases,
  isReadyToSubmit,
  setIsReadyToSubmit,
}: Props) {
  const [getRequestState, setGetRequestState] = useState<RequestState<WithId<Case>>>({
    status: 'idle',
  });
  const [updateRequestState, setUpdateRequestState] = useState<RequestState<WithId<Case>>>({
    status: 'idle',
  });

  const { formState, setFormState, clearForm, hasEmptyFields } = useForm({
    title: '',
    processNumber: '',
    court: '',
    courtDivision: '',
    status: '',
    state: '',
    city: '',
    description: '',
  });

  function checkFields() {
    if (getRequestState.status === 'ok') {
      setIsReadyToSubmit(!hasEmptyFields());
    }
  }

  function updateField(name: string, value: string) {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function getUser() {
    setGetRequestState({ status: 'loading' });
    const response = await getCaseById(caseId || '');

    if (!response.success) {
      setGetRequestState({ ...response, status: 'error' });
      return;
    }

    fillForm(response.data);

    setGetRequestState({ status: 'ok', data: response.data });
  }

  async function alterCase(e: React.FormEvent<HTMLFormElement>) {
    if (!isReadyToSubmit) return;

    e.preventDefault();

    setUpdateRequestState({ status: 'loading' });
    const response = await updateCaseById(caseId || '', formState);

    if (!response.success) {
      if (response.code === 'UNAUTHORIZED') {
        handleLogout();
      }
      return setUpdateRequestState({ ...response, status: 'error' });
    }

    refetchCases();
    clearForm();
    setUpdateRequestState({ status: 'ok', data: response.data });
  }

  function fillForm(data: WithId<Case>) {
    const { title, processNumber, court, courtDivision, status, location, description } = data;

    setFormState({
      title: title ?? '',
      processNumber: processNumber ?? '',
      court: court ?? '',
      courtDivision: courtDivision ?? '',
      status: status ?? '',
      state: location.state ?? '',
      city: location.city ?? '',
      description: description ?? '',
    });
  }

  useEffect(() => {
    getUser();

    return () => {
      setGetRequestState({ status: 'idle' });
      setUpdateRequestState({ status: 'idle' });
    };
  }, []);

  useEffect(() => {
    checkFields();
  }, [formState]);

  switch (getRequestState.status) {
    case 'loading':
      return <LoadingModalScreeen />;

    case 'ok':
      const { title, processNumber, court, courtDivision, status, city, state, description } =
        formState;

      return (
        <form
          id={formId}
          className="flex flex-col gap-[16px] size-full p-[24px]"
          onSubmit={alterCase}
        >
          <RequestFeedback requestState={updateRequestState} />
          <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
            <InputWithLabel
              id="title-input"
              name="title"
              label="Título"
              value={title}
              onChange={(e) => updateField('title', e.target.value)}
            />
            <InputWithLabel
              id="process-number-input"
              name="processNumber"
              label="Número do Processo"
              value={processNumber}
              onChange={(e) => updateField('processNumber', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
            <InputWithLabel
              id="court-input"
              name="court"
              label="Tribunal"
              value={court}
              onChange={(e) => updateField('court', e.target.value)}
            />
            <InputWithLabel
              id="court-division-input"
              name="courtDivision"
              label="Vara"
              value={courtDivision}
              onChange={(e) => updateField('courtDivision', e.target.value)}
            />
            <DropdownInputWithLabel
              id="status-input"
              name="status"
              label="Status"
              itemLabel={CaseStatusLabel}
              value={status}
              setSelectedValue={(value) => updateField('status', value)}
            />
          </div>
          <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
            <DropdownInputWithLabel
              id="estado-input"
              name="state"
              label="Estado"
              itemLabel={BrazilStateLabel}
              value={state}
              setSelectedValue={(value) => updateField('state', value)}
            />
            <DropdownInputWithLabel
              id="city-input"
              name="city"
              label="Cidade"
              itemLabel={CityLabel}
              value={city}
              setSelectedValue={(value) => updateField('city', value)}
            />
          </div>

          <InputWithLabel
            id="description-input"
            name="description"
            label="Description"
            value={description}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </form>
      );

    case 'error':
      return <h3>{getRequestState.message}</h3>;

    default:
      return null;
  }
}
