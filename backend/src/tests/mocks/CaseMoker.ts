import { Mocker } from './fields/Mocker';
import { CaseFieldsMocker } from './fields/CaseFieldsMocker';
import { CasesStatus } from '../../types/CasesStatus';
import { CreateCaseDTO } from '../../dtos/case/CreateCaseDTO';
import { CaseDTO } from '../../dtos/case/CaseDTO';
import { WithId } from '../../types/WithId';

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

  static mockCaseDTOWithId(): WithId<CaseDTO> {
    return {
      id: Mocker.mockMongoId().toString(),
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
