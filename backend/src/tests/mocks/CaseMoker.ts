
import { Mocker } from '../helpers/Mocker';
import { CaseFieldsMocker } from '../helpers/CaseFieldsMocker';
import { CasesStatus } from '../../types/CasesStatus';
import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO';
import { CaseDTO } from '../../dtos/case/CaseDTO';

export class CaseMocker {
  static mockCreateCaseDTO(): CreateCaseDTO {
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

  static mockCaseDTO(): CaseDTO {
    return {
      client: Mocker.mockMongoId().toString(),
      lawyers: [Mocker.mockMongoId().toString()],
      processNumber: CaseFieldsMocker.mockProcessNumber(),
      title: CaseFieldsMocker.mockCaseTitle(),
      description: CaseFieldsMocker.mockDescription(),
      court: CaseFieldsMocker.mockCaseTitle(),
      courtDivision: CaseFieldsMocker.mockCaseTitle(),
      files: [],
      hearings: [],
      status: Mocker.mockEnum(CasesStatus),
      location: CaseFieldsMocker.mockLocation(),
    };
  }
}
