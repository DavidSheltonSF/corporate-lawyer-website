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
import { BrazilState } from '@/types/BrazilState';
import { Case } from '@/types/Case';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { City } from '@/types/City';
import { WithId } from '@/types/WithId';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';
import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { ConfirmModalProps } from '@/components/ui/Modal/ConfirmModal';

interface Props {
  formId: string;
  caseId: string;
  refetchCases: () => void;
}

export function UpdateCaseModalForm({ formId, caseId, refetchCases }: Props) {
  const [caseData, setCaseData] = useState<WithId<Case> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModal();

  function openConfirmDialog(message: string, onCloseGoBack: boolean = false) {
    openModal('confirm', {
      message,
      onConfirm: () => {
        if (onCloseGoBack) {
          openModal('update-case', { formId, caseId, refetchCases });
          return;
        }
        openModal(null);
      },
    });
  }

  async function getUser() {
    try {
      setIsLoading(true);
      const data = await getCaseById(caseId || '');
      setCaseData(data);
    } catch (error: any) {
      console.log(error);

      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
      openConfirmDialog(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function alterCase(formData: FormData) {
    let message = '';
    try {
      const data = await updateCaseById(caseId || '', formData);
      setCaseData(data);
      refetchCases();
      message = 'Processo atualizado com sucesso';
    } catch (error: any) {
      console.log(error);
      message = error.message;
    } finally {
      openConfirmDialog(message, true);
    }
  }

  useEffect(() => {
    if (!caseData) {
      getUser();
    }

    return () => {
      setCaseData(null);
    };
  }, []);

  return (
    <ShowSkeletonOnLoading isLoading={isLoading} Skeleton={LoadingModalScreeen}>
      <form
        id={formId}
        className="flex flex-col gap-[16px] size-full overflow-y-auto p-[24px]"
        action={alterCase}
      >
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
            itemLabel={CaseStatusLabel}
            defaultValue={caseData?.status}
          />
        </div>
        <div className="flex flex-col gap-[16px] min-lg:flex-row w-full">
          <DropdownInputWithLabel
            id="estado-input"
            name="state"
            label="Estado"
            itemLabel={BrazilStateLabel}
            defaultValue={caseData?.location.state}
          />
          <DropdownInputWithLabel
            id="city-input"
            name="city"
            label="Cidade"
            itemLabel={CityLabel}
            defaultValue={caseData?.location.city}
          />
        </div>

        <InputWithLabel
          id="description-input"
          name="description"
          label="Description"
          defaultValue={caseData?.description}
        />
      </form>
    </ShowSkeletonOnLoading>
  );
}
