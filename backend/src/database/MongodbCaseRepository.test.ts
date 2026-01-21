import { config } from 'dotenv';
import { DatabaseConnector } from '../config/database';
import { MongodbCaseRepository } from './MongodbCaseRepository';
import { CaseModel } from '../models/CaseModel';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { UserRole } from '../types/UserRole';
import { IUserModel, UserModel } from '../models/UserModel';
config();
jest.setTimeout(999999);

describe('Test CaseRepository', () => {
  beforeAll(async () => {
    await DatabaseConnector.connectFakeDatabase();
  });

  beforeEach(async () => {
    await CaseModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  function makeSut() {
    const caseRepository = new MongodbCaseRepository();

    return {
      caseRepository,
    };
  }

  test('Should find populated cases properly', async () => {
    const { caseRepository } = makeSut();

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

    const response = await caseRepository.findCaseCards();
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
});
