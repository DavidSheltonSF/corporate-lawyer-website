import { config } from 'dotenv';
import { MongodbCaseRepository } from './MongodbCaseRepository';
import { CaseModel } from '../../../models/CaseModel';
import { CasesStatus } from '../../../types/CasesStatus';
import { UserRole } from '../../../types/UserRole';
import { Types } from 'mongoose';
import { IUserModel, UserModel } from '../../../models/UserModel';
import { BrazilState } from '../../../types/BrazilState';
import { City } from '../../../types/City';
import { UserMocker } from '../../../tests/mocks/entities/UserMocker';
import { MongodbConnector } from '../MongodbConnector';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { WithId } from '../../../types/WithId';
import { UserSlice } from '../../../types/UserSlice';
import { GenericMocker } from '../../../tests/mocks/fields/GenericMocker';
config();

describe('Test CaseRepository', () => {
  let connection: MongodbConnector | null = null;
  beforeAll(async () => {
    connection = await MongodbConnector.connectAndReturn();
  });

  beforeEach(async () => {
    await CaseModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
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

  describe('create', () => {
    it('should create a new case', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();
      const caseData = {
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

      const result = await caseRepository.create(caseData);

      const createdCase = await CaseModel.findById(result.id);

      expect(createdCase?.title).toBe(caseData.title);
      expect(createdCase?.processNumber).toBe(caseData.processNumber);
      expect(createdCase?.description).toBe(caseData.description);
      expect(createdCase?.court).toBe(caseData.court);
      expect(createdCase?.courtDivision).toBe(caseData.courtDivision);
      expect(createdCase?.status).toBe(caseData.status);
      expect(createdCase?.location).toMatchObject(caseData.location);
    });
  });

  describe('updateById', () => {
    it('should update a case', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();
      const caseData = {
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

      const caseId = (await CaseModel.create(caseData))._id;

      const updateData = { title: 'Updated-title', processNumber: '2155585885558-updated' };
      await caseRepository.updateById(caseId.toString(), updateData);

      const updatedCase = await CaseModel.findById(caseId);

      expect(updatedCase?.title).toBe(updateData.title);
      expect(updatedCase?.processNumber).toBe(updateData.processNumber);
      expect(updatedCase?.description).toBe(caseData.description);
      expect(updatedCase?.court).toBe(caseData.court);
      expect(updatedCase?.courtDivision).toBe(caseData.courtDivision);
      expect(updatedCase?.status).toBe(caseData.status);
      expect(updatedCase?.location).toMatchObject(caseData.location);
    });
  });

  describe('findAll', () => {
    it('should find all cases', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const caseData = {
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

      await CaseModel.create(caseData);

      const response = (await caseRepository.findAll()) as any;
      const cases = response.items;
      const case1 = cases[0];

      expect(case1?.client.id).toBe(clientId.toString());
      expect(case1?.lawyers[0]?.id).toBe(lawyerId.toString());
      expect(case1?.processNumber).toBe(caseData.processNumber);
      expect(case1?.title).toBe(caseData.title);
      expect(case1?.description).toBe(caseData.description);
      expect(case1?.court).toBe(caseData.court);
      expect(case1?.courtDivision).toBe(caseData.courtDivision);
      expect(case1?.status).toBe(caseData.status);
    });
  });

  describe('existsById', () => {
    it('should return true if case exists, but false if case does not exist', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const caseData = {
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

      const existingId = (await CaseModel.create(caseData))._id;
      const nonExistingId = GenericMocker.mockMongoId();

      const existingCase = await caseRepository.existsById(existingId.toString());
      const nonExistingCase = await caseRepository.existsById(nonExistingId.toString());

      expect(existingCase).toBeTruthy();
      expect(nonExistingCase).toBeFalsy();
    });
  });

  describe('findById', () => {
    it('should find case by id', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const caseData = {
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

      const existingId = (await CaseModel.create(caseData))._id;
      const nonExistingId = GenericMocker.mockMongoId();

      const existingCase = (await caseRepository.findById(existingId.toString())) as any;
      const nonExistingCase = await caseRepository.findById(nonExistingId.toString());

      expect(existingCase?.client).toBe(clientId.toString());
      expect(existingCase?.lawyers[0]).toBe(lawyerId.toString());
      expect(existingCase?.processNumber).toBe(caseData.processNumber);
      expect(existingCase?.title).toBe(caseData.title);
      expect(existingCase?.description).toBe(caseData.description);
      expect(existingCase?.court).toBe(caseData.court);
      expect(existingCase?.courtDivision).toBe(caseData.courtDivision);
      expect(existingCase?.status).toBe(caseData.status);
      expect(nonExistingCase).toBeNull();
    });
  });

  describe('findPopulatedById', () => {
    it('should find a populated case by id', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const caseData = {
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

      const existingId = (await CaseModel.create(caseData))._id;
      const nonExistingId = GenericMocker.mockMongoId();

      const existingCase = (await caseRepository.findPopulatedById(existingId.toString())) as any;
      const nonExistingCase = await caseRepository.findPopulatedById(nonExistingId.toString());

      expect(existingCase?.client.id).toBe(clientId.toString());
      expect(existingCase?.lawyers[0].id).toBe(lawyerId.toString());
      expect(existingCase?.processNumber).toBe(caseData.processNumber);
      expect(existingCase?.title).toBe(caseData.title);
      expect(existingCase?.description).toBe(caseData.description);
      expect(existingCase?.court).toBe(caseData.court);
      expect(existingCase?.courtDivision).toBe(caseData.courtDivision);
      expect(existingCase?.status).toBe(caseData.status);
      expect(nonExistingCase).toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return the global case statistics', async () => {
      const { caseRepository } = await makeSut();
    
      const expectedStatistics = {open: 0, closed: 0};

      const stats = await caseRepository.getStats();

      expect(stats).toMatchObject(expectedStatistics)
    });
  });


  describe('getStatsByClientId', () => {
    it('should return the case statistics by client id', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const expectedStatistics = { open: 0, closed: 0 };

      const stats = await caseRepository.getStatsByClientId(clientId.toString());

      expect(stats).toMatchObject(expectedStatistics);
    });
  });

  describe('deleteById', () => {
    it('should delete a case from the database', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const caseData = {
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

      const caseId = (await CaseModel.create(caseData))._id.toString();

      await caseRepository.deleteById(caseId);

      const findCaseResult = await CaseModel.findById(caseId);

      expect(findCaseResult).toBeNull();
    });
  })
  
  describe('deleteByUserId', () => {
    it('should delete a case from the database', async () => {
      const { caseRepository, clientId, lawyerId } = await makeSut();

      const caseData = {
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

      const caseId = (await CaseModel.create(caseData))._id.toString();

      await caseRepository.deleteByUserId(clientId.toString());

      const findCaseResult = await CaseModel.findById(caseId);

      expect(findCaseResult).toBeNull();
    });
  });
});
