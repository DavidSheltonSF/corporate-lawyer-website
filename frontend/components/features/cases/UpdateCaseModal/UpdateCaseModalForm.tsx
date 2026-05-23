import { DropdownInputWithLabel } from '@/components/ui/Input/DropdownInputWithLabel';
import { InputWithLabel } from '@/components/ui/Input/InputWithLabel';
import { BrazilStateLabel } from '@/lib/BrazilStateLabel';
import { CaseStatusLabel } from '@/lib/CaseStatusLabel';
import { CityLabel } from '@/lib/CityLabel';
import { BrazilState } from '@/types/BrazilState';
import { Case } from '@/types/Case';
import { CaseStatusEnum } from '@/types/CaseStatusEnum';
import { City } from '@/types/City';
import { WithId } from '@/types/WithId';

interface Props {
  formId: string;
  caseData: WithId<Case> | null;
  action: (formData: FormData) => Promise<void>;
}

export function UpdateCaseModalForm({ formId, caseData, action }: Props) {
  return (
    <form id={formId} className="flex flex-col gap-[16px] size-full overflow-y-auto" action={action}>
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

      <InputWithLabel
        id="description-input"
        name="description"
        label="Description"
        defaultValue={caseData?.description}
      />
    </form>
  );
}
