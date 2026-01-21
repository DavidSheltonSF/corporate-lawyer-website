import { Types } from 'mongoose';
import { DatabaseConnector } from '../config/database';
import { CaseFileModel, ICaseFileModel } from '../models/CaseFileModel';
import { CaseModel } from '../models/CaseModel';
import { IUserModel, UserModel } from '../models/UserModel';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { UserRole } from '../types/UserRole';
import { WithMongoId } from './types/WithMongoId';
import { MongodbCaseFileRepository } from './MongodbCaseFileRepository';

jest.setTimeout(99999);

describe('Test MongodbCaseFileRepository', () => {
  beforeAll(async () => {
    await DatabaseConnector.connectFakeDatabase();
  });

  beforeEach(async () => {
    await CaseFileModel.deleteMany({});
    await CaseModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  async function makeSut() {
    const client: WithMongoId<IUserModel> = {
      _id: Types.ObjectId.createFromTime(555),
      firstName: 'Flávia',
      lastName: 'Santiago',
      email: 'flavia@email.com',
      cpf: '11144744474',
      password: 'flavia123',
      role: UserRole.client,
    };

    const lawyer: WithMongoId<IUserModel> = {
      _id: Types.ObjectId.createFromTime(54343455),
      firstName: 'Carla',
      lastName: 'Medeiros',
      email: 'carla@email.com',
      cpf: '11148814474',
      password: 'carla123',
      role: UserRole.lawyer,
    };

    const newCase = {
      client: client._id,
      lawyers: [lawyer._id],
      processNumber: '354435235425623',
      title: 'Case title',
      description: 'Case description',
      court: 'court', //tribunal
      courtDivision: 'court division', //vara
      status: CaseStatusEnum.aberto,
    };

    const caseId = (await CaseModel.create(newCase))._id;
    const clientId = (await UserModel.create(client))._id;

    const caseFileRepository = new MongodbCaseFileRepository();

    return {
      clientId,
      caseId,
      caseFileRepository,
    };
  }

  test('Should find case files by case id', async () => {
    const { clientId, caseId, caseFileRepository } = await makeSut();

    const newCaseFile1: WithMongoId<ICaseFileModel> = {
      _id: Types.ObjectId.createFromTime(151456),
      name: 'comprovante-de-residencia.pdf',
      url: 'www.fake-url.com',
      uploadedBy: clientId,
      case: caseId,
    };

    const newCaseFile2: WithMongoId<ICaseFileModel> = {
      _id: Types.ObjectId.createFromTime(158886),
      name: 'comprovante-de-casamento.pdf',
      url: 'www.fake-url2.com',
      uploadedBy: clientId,
      case: caseId,
    };

    await CaseFileModel.create(newCaseFile1);
    await CaseFileModel.create(newCaseFile2);

    const [caseFile1, caseFile2] = await caseFileRepository.findByCaseId(caseId.toString());

    expect(caseFile1?.id).toBe(newCaseFile1._id.toString());
    expect(caseFile1?.name).toBe(newCaseFile1.name);
    expect(caseFile1?.url).toBe(newCaseFile1.url);
    expect(caseFile1?.uploadedBy.id).toBe(newCaseFile1.uploadedBy.toString());
    expect(caseFile1?.case).toBe(newCaseFile1.case.toString());

    expect(caseFile2?.id).toBe(newCaseFile2._id.toString());
    expect(caseFile2?.name).toBe(newCaseFile2.name);
    expect(caseFile2?.url).toBe(newCaseFile2.url);
    expect(caseFile2?.uploadedBy.id).toBe(newCaseFile2.uploadedBy.toString());
    expect(caseFile2?.case).toBe(newCaseFile2.case.toString());
  });

  test('Should create a valid case file', async () => {
    const { caseFileRepository, clientId, caseId } = await makeSut();

    const newCaseFile = {
      name: 'comprovante-de-residencia.pdf',
      url: 'www.fake-url.com',
      uploadedBy: clientId.toString(),
      case: caseId.toString(),
    };

    await caseFileRepository.create(newCaseFile);

    const [foundCaseFile] = await CaseFileModel.find({ case: caseId.toString() });

    expect(foundCaseFile?.name).toBe(newCaseFile.name);
    expect(foundCaseFile?.url).toBe(newCaseFile.url);
    expect(foundCaseFile?.uploadedBy.toString()).toBe(newCaseFile.uploadedBy);
    expect(foundCaseFile?.case.toString()).toBe(newCaseFile.case);
  });
});
