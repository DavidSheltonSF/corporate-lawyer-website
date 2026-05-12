import { config } from 'dotenv';
import { MongodbCaseRepository } from './MongodbCaseRepository';
import { CaseModel } from '../../../models/CaseModel';
import { CasesStatus } from '../../../types/CasesStatus';
import { UserRole } from '../../../types/UserRole';
import { Types } from 'mongoose';
import { MongodbTestConnector } from '../MongodbTestConnector';
import { IUserModel, UserModel } from '../../../models/UserModel';
import { CaseFile } from '../../../entities/CaseFile';
import { BrazilState } from '../../../types/BrazilState';
import { City } from '../../../types/City';
import { UserMocker } from '../../../tests/mocks/entities/UserMocker';
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

    const newClient = UserMocker.mockUserDTO();
    newClient.role = UserRole.client;

    const newLawyer = UserMocker.mockUserDTO();
    newLawyer.role = UserRole.lawyer;

    const clientId = (await UserModel.create(newClient))._id;
    const lawyerId = (await UserModel.create(newLawyer))._id;

    return {
      caseRepository,
      clientId,
      lawyerId,
    };
  }

  test('should create a new case data', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();
    const newCase = {
      client: clientId.toString(),
      lawyers: [lawyerId.toString()],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
    };

    const result = await caseRepository.create(newCase);

    const createdCase = await CaseModel.findById(result.id);

    expect(createdCase?.title).toBe(newCase.title);
    expect(createdCase?.processNumber).toBe(newCase.processNumber);
    expect(createdCase?.description).toBe(newCase.description);
    expect(createdCase?.court).toBe(newCase.court);
    expect(createdCase?.courtDivision).toBe(newCase.courtDivision);
    expect(createdCase?.status).toBe(newCase.status);
  });

  test('should update a case data', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();
    const newCase = {
      client: clientId,
      lawyers: [lawyerId],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
    };

    const caseId = (await CaseModel.create(newCase))._id;

    const updatedData = { title: 'Updated-title', processNumber: '2155585885558-updated' };
    await caseRepository.updateById(caseId.toString(), updatedData);

    const updatedCase = await CaseModel.findById(caseId);

    expect(updatedCase?.title).toBe(updatedData.title);
    expect(updatedCase?.processNumber).toBe(updatedData.processNumber);
    expect(updatedCase?.description).toBe(newCase.description);
    expect(updatedCase?.court).toBe(newCase.court);
    expect(updatedCase?.courtDivision).toBe(newCase.courtDivision);
    expect(updatedCase?.status).toBe(newCase.status);
  });

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
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
    };

    await CaseModel.create(newCase);

    const response = await caseRepository.findAll();
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
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
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
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
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
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
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

    const files = await caseRepository.findFilesByCaseId(caseId);

    if (!files) {
      throw Error('Missing case files');
    }

    const file = files[0];

    expect(errorHasBeenThrown).toBeFalsy();
    expect(file?.name).toBe(newFile.name);
    expect(file?.mimeType).toBe(newFile.mimeType);
    expect(file?.size).toBe(newFile.size);
    expect(file?.uploadedBy.id).toBe(newFile.uploadedBy);
  });

  test('should delete a case from the database', async () => {
    const { caseRepository, clientId, lawyerId } = await makeSut();

    const newCase = {
      client: clientId,
      lawyers: [lawyerId],
      processNumber: '214435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CasesStatus.open,
      location: {
        state: BrazilState.RIO_DE_JANEIRO,
        city: City.DUQUE_DE_CAXIAS,
      },
    };

    const caseId = (await CaseModel.create(newCase))._id.toString();

    await caseRepository.deleteById(caseId);

    const findCaseResult = await CaseModel.findById(caseId);

    expect(findCaseResult).toBeNull();
  });
});
