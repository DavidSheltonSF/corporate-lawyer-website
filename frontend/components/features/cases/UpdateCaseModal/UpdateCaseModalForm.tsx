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
import { hasEmptyFields } from '@/lib/form';

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
  const INITIAL_FORM_DATA = {
    title: '',
    processNumber: '',
    court: '',
    courtDivision: '',
    status: '',
    state: '',
    city: '',
    description: '',
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  function checkFields() {
    if (getRequestState.status === 'ok') {
      setIsReadyToSubmit(!hasEmptyFields(formData));
    }
  }

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
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

  async function alterCase(formData: FormData) {
    if (!isReadyToSubmit) return;

    setUpdateRequestState({ status: 'loading' });
    const response = await updateCaseById(caseId || '', formData);

    if (!response.success) {
      if (response.code === 'UNAUTHORIZED') {
        handleLogout();
      }
      return setUpdateRequestState({ ...response, status: 'error' });
    }

    refetchCases();
    resetForm();
    setUpdateRequestState({ status: 'ok', data: response.data });
  }

  function fillForm(data: any) {
    const { title, processNumber, court, courtDivision, status, location, description } = data;

    setFormData({
      title,
      processNumber,
      court,
      courtDivision,
      status,
      state: location.state,
      city: location.city,
      description,
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
  }, [formData]);

  switch (getRequestState.status) {
    case 'loading':
      return <LoadingModalScreeen />;

    case 'ok':
      const { title, processNumber, court, courtDivision, status, city, state, description } =
        formData;

      return (
        <form
          id={formId}
          className="flex flex-col gap-[16px] size-full p-[24px]"
          action={alterCase}
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
              onSelectValue={(value) => updateField('status', value)}
            />
          </div>
          <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
            <DropdownInputWithLabel
              id="estado-input"
              name="state"
              label="Estado"
              itemLabel={BrazilStateLabel}
              value={state}
              onSelectValue={(value) => updateField('state', value)}
            />
            <DropdownInputWithLabel
              id="city-input"
              name="city"
              label="Cidade"
              itemLabel={CityLabel}
              value={city}
              onSelectValue={(value) => updateField('city', value)}
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
