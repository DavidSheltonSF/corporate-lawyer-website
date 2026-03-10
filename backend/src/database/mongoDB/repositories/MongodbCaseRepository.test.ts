import { config } from 'dotenv';
import { MongodbCaseRepository } from './MongodbCaseRepository';
import { CaseModel } from '../../../models/CaseModel';
import { CaseStatusEnum } from '../../../types/CaseStatusEnum';
import { UserRole } from '../../../types/UserRole';
import { Types } from 'mongoose';
import { MongodbTestConnector } from '../MongodbTestConnector';
import { IUserModel, UserModel } from '../../../models/UserModel';
import { CaseFile } from '../../../entities/CaseFile';
import { WithId } from '../../../types/WithId';
import { CaseFileDTO } from '../../../dtos/caseFile/CaseFileDTO';
config();
jest.setTimeout(999999);

describe('Test CaseRepository', () => {
  let connection: MongodbTestConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbTestConnector.connectAndReturn('case_repository_test');
  });

  beforeEach(async () => {
    await CaseModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await connection?.deleteDatabase();
    await connection?.disconnect();
  });

  async function makeSut() {
    const caseRepository = new MongodbCaseRepository();

    const newClient: IUserModel = {
      firstName: 'Flávia',
      lastName: 'Santiago',
      email: 'flavia@email.com',
      cpf: '11144744474',
      password: 'flavia123',
      role: UserRole.client,
    };

    const newLawyer = {
      firstName: 'Carla',
      lastName: 'Medeiros',
      email: 'carla@email.com',
      cpf: '11148814474',
      password: 'carla123',
      role: UserRole.lawyer,
    };

    const clientId = (await UserModel.create(newClient))._id;
    const lawyerId = (await UserModel.create(newLawyer))._id;

    return {
      caseRepository,
      clientId,
      lawyerId,
    };
  }

  test('Should find populated cases properly', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();

    const newCase = {
      client: clientId,
      lawyers: [lawyerId],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CaseStatusEnum.aberto,
    };

    await CaseModel.create(newCase);

    const response = await caseRepository.findCases();
    const cases = response.data;
    const case1 = cases[0];

    expect(case1?.client.id).toBe(clientId.toString());
    expect(case1?.lawyers[0]?.id).toBe(lawyerId.toString());
    expect(case1?.processNumber).toBe(newCase.processNumber);
    expect(case1?.title).toBe(newCase.title);
    expect(case1?.description).toBe(newCase.description);
    expect(case1?.court).toBe(newCase.court);
    expect(case1?.courtDivision).toBe(newCase.courtDivision);
    expect(case1?.status).toBe(newCase.status);
  });

  test('should return true if case exists, but false if case does not exist', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();

    const newCase = {
      client: clientId,
      lawyers: [lawyerId],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CaseStatusEnum.aberto,
    };

    const newId = (await CaseModel.create(newCase))._id;

    const existingCase = await caseRepository.exists(newId.toString());
    const nonExistingCase = await caseRepository.exists(
      Types.ObjectId.createFromTime(822211126141).toString()
    );

    expect(existingCase).toBeTruthy();
    expect(nonExistingCase).toBeFalsy();
  });

  test('should add a new file to a case', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();

    const newCase = {
      client: clientId,
      lawyers: [lawyerId],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CaseStatusEnum.aberto,
    };

    const caseId = (await CaseModel.create(newCase))._id.toString();

    const newFile: CaseFile = {
      caseId,
      mimeType: 'pdf',
      name: 'Document',
      size: 80,
      uploadedBy: clientId.toString(),
      url: 't4est-url',
    };

    let errorHasBeenThrown = false;

    try {
      await caseRepository.addFile(caseId, newFile);
    } catch (error) {
      errorHasBeenThrown = true;
    }

    const result = await caseRepository.findById(caseId);
    expect(errorHasBeenThrown).toBeFalsy();
  });

  test('should find all files from a case', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();

    const newCase = {
      client: clientId,
      lawyers: [lawyerId],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CaseStatusEnum.aberto,
    };

    const caseId = (await CaseModel.create(newCase))._id.toString();

    const newFile: CaseFile = {
      caseId,
      mimeType: 'pdf',
      name: 'Document',
      size: 80,
      uploadedBy: clientId.toString(),
      url: 't4est-url',
    };

    let errorHasBeenThrown = false;
    let result: WithId<CaseFileDTO>[] = [];
    await CaseModel.findByIdAndUpdate(
      {
        _id: caseId,
      },
      {
        $push: {
          files: newFile,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    try {
      result = await caseRepository.findFilesByCaseId(caseId);
    } catch (error) {
      errorHasBeenThrown = true;
    }
    expect(errorHasBeenThrown).toBeFalsy();
    expect(result[0]?.name).toBe(newFile.name);
    expect(result[0]?.mimeType).toBe(newFile.mimeType);
    expect(result[0]?.size).toBe(newFile.size);
    expect(result[0]?.uploadedBy.id).toBe(newFile.uploadedBy);
  });
});
