import { Types } from 'mongoose';
import { DatabaseConnector } from '../config/database';
import { WithMongoId } from '../database/types/WithMongoId';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { UserRole } from '../types/UserRole';
import { CaseFileModel, ICaseFileModel } from './CaseFileModel';
import { CaseModel } from './CaseModel';
import { IUserModel, UserModel } from './UserModel';

describe('Testing CaseFileModel', () => {
  beforeAll(async () => {
    await DatabaseConnector.connectFakeDatabase();
  });

  beforeEach(async () => {
    await CaseFileModel.deleteMany({});
    await UserModel.deleteMany({});
    await CaseModel.deleteMany({});
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

    return {
      clientId: client._id,
      caseId,
    };
  }

  test('Should create a new CaseFile', async () => {
    const { clientId, caseId } = await makeSut();

    const newCaseFile: ICaseFileModel = {
      name: 'comprovante-de-residencia.pdf',
      url: 'www.fake-url.com',
      uploadedBy: clientId,
      case: caseId,
    };

    const createdCaseFile = await CaseFileModel.create(newCaseFile);

    expect(createdCaseFile.name).toBe(newCaseFile.name);
    expect(createdCaseFile.url).toBe(newCaseFile.url);
    expect(createdCaseFile.uploadedBy.toString()).toBe(newCaseFile.uploadedBy.toString());
    expect(createdCaseFile.case.toString()).toBe(newCaseFile.case.toString());
  });
});
