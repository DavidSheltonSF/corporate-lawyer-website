import { GenericMocker } from '../fields/GenericMocker.js';
import { CaseFieldsMocker } from '../fields/CaseFieldsMocker.js';
import { CasesStatus } from '../../../types/CasesStatus.js';
import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO.js';
import { CaseDTO } from '../../../dtos/case/CaseDTO.js';
import { WithId } from '../../../types/WithId.js';

export class CaseMocker {
  static mockCreateCaseDTO(): CreateCaseDTO {
    return {
      client: GenericMocker.mockMongoId().toString(),
      lawyers: [GenericMocker.mockMongoId().toString()],
      caseNumber: CaseFieldsMocker.mockCaseNumber(),
      title: CaseFieldsMocker.mockCaseTitle(),
      description: CaseFieldsMocker.mockDescription(),
      court: CaseFieldsMocker.mockCaseTitle(), //tribunal
      courtDivision: CaseFieldsMocker.mockCaseTitle(), //vara
      status: GenericMocker.mockEnum(CasesStatus),
      location: CaseFieldsMocker.mockLocation(),
    };
  }

  static mockCaseDTO(): CaseDTO {
    return {
      client: GenericMocker.mockMongoId().toString(),
      lawyers: [GenericMocker.mockMongoId().toString()],
      caseNumber: CaseFieldsMocker.mockCaseNumber(),
      title: CaseFieldsMocker.mockCaseTitle(),
      description: CaseFieldsMocker.mockDescription(),
      court: CaseFieldsMocker.mockCaseTitle(),
      courtDivision: CaseFieldsMocker.mockCaseTitle(),
      status: GenericMocker.mockEnum(CasesStatus),
      location: CaseFieldsMocker.mockLocation(),
      populated: false,
    };
  }

  static mockCaseDTOWithId(): WithId<CaseDTO> {
    return {
      id: GenericMocker.mockMongoId().toString(),
      ...CaseMocker.mockCaseDTO(),
    };
  }
}
