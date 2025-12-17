import { DatabaseConnector } from '../config/database';
import { CaseModel } from './case.model';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import { Case } from '../types/Case';
import { Types } from 'mongoose';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
import { UserModel } from './user.model';

config();

jest.setTimeout(99999);

describe('Testing CaseModel', () => {
  beforeAll(async () => {
    await DatabaseConnector.connect();
    await CaseModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  test('should create a new case', async () => {
    const newCase: Case = {
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
  });
});
