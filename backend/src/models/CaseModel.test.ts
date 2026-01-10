import { DatabaseConnector } from '../config/database';
import { CaseModel } from './CaseModel';
import { config } from 'dotenv';
import { Types } from 'mongoose';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { UserRole } from '../types/UserRole';
import { UserModel } from './UserModel';

config();

jest.setTimeout(99999);

describe('Testing CaseModel', () => {
  beforeAll(async () => {
    await DatabaseConnector.connectFakeDatabase();
    await UserModel.deleteMany({});
    await CaseModel.deleteMany({});
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await CaseModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  test('should create a new case', async () => {
    const newCase = {
      client: Types.ObjectId.createFromTime(511),
      lawyers: [Types.ObjectId.createFromTime(55555)],
      processNumber: '261514514584615648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CaseStatusEnum.em_andamento,
    };
    const result = await CaseModel.create(newCase);

    // Check if the result contain  every value inside newCase
    expect(result.toObject()).toMatchObject(newCase);
  });

  test('should get the populated client', async () => {
    const newCLient = {
      firstName: 'José',
      lastName: 'Vanio',
      email: 'jovral@email.com',
      cpf: '22200047877',
      role: UserRole.client,
      password: 'nfisngfisfesag',
    };

    const newCase = {
      client: Types.ObjectId.createFromTime(511),
      lawyers: [Types.ObjectId.createFromTime(55555)],
      processNumber: '261514514584615648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CaseStatusEnum.em_andamento,
    };
    const createdClient = await UserModel.create(newCLient);

    newCase.client = createdClient._id;
    const createdCase = await CaseModel.create(newCase);

    const caseWithPopulatedFields = (await CaseModel.findOne({ _id: createdCase._id })
      .populate('client', 'firstName lastName')
      .lean()) as any;

    const client = caseWithPopulatedFields?.client;

    expect(client?._id.toString()).toBe(createdClient._id.toString());
    expect(client?.firstName).toBe(createdClient.firstName);
    expect(client?.lastName).toBe(createdClient.lastName);
  });

  test('should get the populated lawyers', async () => {
    const newLawyer1 = {
      firstName: 'Carla',
      lastName: 'Santiago',
      email: 'carla@email.com',
      cpf: '22111117877',
      role: UserRole.lawyer,
      password: 'nficcccccfesag',
    };

    const newLawyer2 = {
      firstName: 'Gabriel',
      lastName: 'Murilo',
      email: 'gabriel@email.com',
      cpf: '22207778877',
      role: UserRole.lawyer,
      password: 'nfiee333sfesag',
    };

    const newCase = {
      client: Types.ObjectId.createFromTime(511),
      lawyers: [Types.ObjectId.createFromTime(55555)],
      processNumber: '261514514584615648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CaseStatusEnum.em_andamento,
    };

    const createdLawyer1 = await UserModel.create(newLawyer1);
    const createdLawyer2 = await UserModel.create(newLawyer2);

    newCase.lawyers = [createdLawyer1._id, createdLawyer2._id];
    const createdCase = await CaseModel.create(newCase);

    const caseWithPopulatedFields = (await CaseModel.findOne({ _id: createdCase._id })
      .populate('lawyers', 'firstName lastName')
      .lean()) as any;

    const lawyers = caseWithPopulatedFields?.lawyers;

    if (!lawyers) {
      throw Error('Lawyers were not found in the response');
    }

    const [lawyer1, lawyer2] = lawyers;

    expect(lawyer1?._id.toString()).toBe(createdLawyer1._id.toString());
    expect(lawyer1?.firstName).toBe(newLawyer1.firstName);
    expect(lawyer1?.lastName).toBe(newLawyer1.lastName);
    expect(lawyer2?._id.toString()).toBe(createdLawyer2._id.toString());
    expect(lawyer2?.firstName).toBe(newLawyer2.firstName);
    expect(lawyer2?.lastName).toBe(newLawyer2.lastName);
  });
});
