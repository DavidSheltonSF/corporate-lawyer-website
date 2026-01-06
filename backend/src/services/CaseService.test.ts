import { Types } from 'mongoose';
import { DatabaseConnector } from '../config/database';
import { CaseModel } from '../infra/mongodb/models/case.model';
import { Case } from '../types/Case';
import { CaseService } from './CaseService';
import { config } from 'dotenv';
import { CaseStatusEnum } from '../types/CaseStatusEnum';

config();

jest.setTimeout(999999);

describe('Test CaseService', () => {
  beforeAll(async () => {
    await DatabaseConnector.connect();
  });

  beforeEach(async () => {
    await CaseModel.deleteMany({});
  });

  afterAll(async () => {
    await DatabaseConnector.disconnect();
  });

  function makeSut() {
    const caseService = new CaseService();

    return {
      caseService,
    };
  }

  test('should create a new case', async () => {
    const { caseService } = makeSut();

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

    const createdCase = await caseService.create(newCase);
    const { createdAt, updatedAt, ...casesWithoutTimeStamps } = createdCase;

    expect(newCase).toMatchObject(casesWithoutTimeStamps);
  });

  test('should find all cases', async () => {
    const { caseService } = makeSut();

    const newCases: Case[] = [
      {
        client: Types.ObjectId.createFromTime(511),
        lawyers: [Types.ObjectId.createFromTime(55555)],
        processNumber: '261514514584615648',
        title: 'Process Title',
        court: 'STJ',
        courtDivision: 'Vara Cívil',
        description: 'Case description',
        status: CaseStatusEnum.em_andamento,
      },
      {
        client: Types.ObjectId.createFromTime(511),
        lawyers: [Types.ObjectId.createFromTime(8801555)],
        processNumber: '11111451458777648',
        title: 'Process Title',
        court: 'STJ',
        courtDivision: 'Vara Cívil',
        description: 'Case description',
        status: CaseStatusEnum.encerrado,
      },
    ];

    await CaseModel.create(newCases);

    const response = await caseService.findAll();
    const foundCases = response.cases;
    const casesWithoutTimeStamps = foundCases.map((cas) => {
      const { createdAt, updatedAt, ...casWithoutTime } = cas;
      return casWithoutTime;
    });

    expect(newCases).toEqual(
      expect.arrayContaining([
        expect.objectContaining(casesWithoutTimeStamps[0]),
        expect.objectContaining(casesWithoutTimeStamps[1]),
      ])
    );
  });

  test('should find case by id', async () => {
    const { caseService } = makeSut();

    const newCase1 = {
      client: Types.ObjectId.createFromTime(511),
      lawyers: [Types.ObjectId.createFromTime(55555)],
      processNumber: '261514514584615648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CaseStatusEnum.em_andamento,
    };

    const newCase2 = {
      client: Types.ObjectId.createFromTime(511),
      lawyers: [Types.ObjectId.createFromTime(8801555)],
      processNumber: '11111451458777648',
      title: 'Process Title',
      court: 'STJ',
      courtDivision: 'Vara Cívil',
      description: 'Case description',
      status: CaseStatusEnum.encerrado,
    };

    const createdCase1 = await CaseModel.create(newCase1);
    const createdCase2 = await CaseModel.create(newCase2);

    const foundCase = await caseService.findById(createdCase1._id.toString());
    if (!foundCase) {
      throw Error('No case was found in FindById test');
    }
    const { createdAt, updatedAt, ...caseWithoutTimeStamps } = foundCase;

    expect(newCase1).toMatchObject(caseWithoutTimeStamps);
  });

  test('should find case by client id', async () => {
    const { caseService } = makeSut();

    const clientId = Types.ObjectId.createFromTime(511);
    const newCases: Case[] = [
      {
        client: clientId,
        lawyers: [Types.ObjectId.createFromTime(55555)],
        processNumber: '261514514584615648',
        title: 'Process1',
        court: 'STJ',
        courtDivision: 'Vara Cívil',
        description: 'Case description',
        status: CaseStatusEnum.em_andamento,
      },
      {
        client: clientId,
        lawyers: [Types.ObjectId.createFromTime(8801555)],
        processNumber: '11111451458777648',
        title: 'Process2',
        court: 'STJ',
        courtDivision: 'Vara Cívil',
        description: 'Case description',
        status: CaseStatusEnum.encerrado,
      },
      {
        client: Types.ObjectId.createFromTime(8555),
        lawyers: [Types.ObjectId.createFromTime(8801555)],
        processNumber: '11111451478899648',
        title: 'Process3',
        court: 'STJ',
        courtDivision: 'Vara Cívil',
        description: 'Case description',
        status: CaseStatusEnum.encerrado,
      },
    ];

    await CaseModel.create(newCases);

    const response = await caseService.findAll({ client: clientId.toString() });
    const foundCases = response.cases;

    const casesWithoutTimeStamps = foundCases.map((cas) => {
      const { createdAt, updatedAt, ...casWithoutTime } = cas;
      return casWithoutTime;
    });

    expect(newCases).toEqual(
      expect.arrayContaining([
        expect.objectContaining(casesWithoutTimeStamps[0]),
        expect.objectContaining(casesWithoutTimeStamps[1]),
      ])
    );
  });
});
