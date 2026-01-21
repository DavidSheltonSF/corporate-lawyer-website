import { config } from 'dotenv';

import { DatabaseConnector } from '../config/database';
import { MongodbCaseRepository } from './MongodbCaseRepository';
import { CaseModel } from '../models/CaseModel';
import { Types } from 'mongoose';
import { CaseStatusEnum } from '../types/CaseStatusEnum';
config();
jest.setTimeout(999999);

describe('Test CaseRepository', () => {
  beforeAll(async () => {
    await DatabaseConnector.connectFakeDatabase();
  });

  beforeEach(async () => {
    await CaseModel.deleteMany({});
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

  test('should', async () => {
    const { caseRepository } = makeSut();
    const newCase = {
      client: Types.ObjectId.createFromTime(161),
      lawyers: [Types.ObjectId.createFromTime(161)],
      processNumber: 'string',
      title: 'string',
      description: 'string',
      court: 'string', //tribunal
      courtDivision: 'string', //vara
      status: CaseStatusEnum.aberto,
      documents: [],
      hearings: [],
    };

    await CaseModel.create(newCase);

    await caseRepository.findCaseCards();
  });
});
