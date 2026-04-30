import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO';
import { CasesStatus } from '../../../types/CasesStatus';
import { CaseFieldsMocker } from '../../helpers/CaseFieldsMocker';
import { Mocker } from '../../helpers/Mocker';

export function mockCreateCaseDTO(): CreateCaseDTO {
  return {
    client: Mocker.mockMongoId().toString(),
    lawyers: [Mocker.mockMongoId().toString()],
    processNumber: CaseFieldsMocker.mockProcessNumber(),
    title: CaseFieldsMocker.mockCaseTitle(),
    description: CaseFieldsMocker.mockDescription(),
    court: CaseFieldsMocker.mockCaseTitle(), //tribunal
    courtDivision: CaseFieldsMocker.mockCaseTitle(), //vara
    status: Mocker.mockEnum(CasesStatus),
    location: CaseFieldsMocker.mockLocation(),
  };
}
