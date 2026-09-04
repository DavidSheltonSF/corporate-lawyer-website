import { describe, it, expect } from 'vitest';
import { CaseMocker } from '../../tests/mocks/entities/CaseMoker';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { CaseController } from './CaseController';
import { createMockObject } from '../../tests/mocks/createMockObject';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';
import { IFileService } from '../../services/files/IFileService';
import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO';
import { UserRole } from '../../types/UserRole';
import { createMockFileMulter } from '../../tests/mocks/createMockFileMulter';
import { FileMocker } from '../../tests/mocks/entities/FileMocker';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { NotFoundError } from '../../errors/presentation/NotFoundError';
import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { createMockPage } from '../../tests/mocks/createMockPage';
import { createMockCaseService } from '../../tests/mocks/services/createMockCaseService';

describe(`Test ${CaseController.name}`, () => {
  function makeSut() {
    const fakeId = 'fakeId';
    const fileService = createMockObject<IFileService>([
      'create',
      'deleteByOwnerId',
      'findByOwnerId',
    ]);
    const caseService = createMockCaseService();
    const caseController = new CaseController(caseService, fileService);

    return {
      caseService,
      fileService,
      caseController,
      fakeId,
    };
  }

  describe('create', () => {
    it('should create a new case and return Created', async () => {
      const { caseController, caseService } = makeSut();

      const caseData = CaseMocker.mockCreateCaseDTO();

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseService.create.mockResolvedValue(expectedCase);

      const httpRequest = createMockHttpRequest({
        body: caseData,
      });

      const response = await caseController.create(httpRequest);

      expect(caseService.create).toHaveBeenCalledWith(caseData);
      expect(response).toMatchObject({
        data: expectedCase,
        status: HttpStatusCode.created,
      });
    });

    it('should throw BadRequestError if the request body is missing', async () => {
      const { caseController, caseService } = makeSut();
      const httpRequest = createMockHttpRequest();

      await expect(caseController.create(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if any required field is missing', async () => {
      const { caseController, caseService } = makeSut();

      const createCaseDTO = CaseMocker.mockCreateCaseDTO();
      const { processNumber, ...missingFieldsDTO } = createCaseDTO;

      const httpRequest = createMockHttpRequest({
        body: missingFieldsDTO,
      });

      await expect(caseController.create(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.create).not.toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    it('should update a case by id and return OK', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const updateData: UpdateCaseDTO = {
        title: 'Pedido de pensão para menores',
        court: 'fakecourt',
      };

      const httpRequest = createMockHttpRequest({
        body: updateData,
        params: { id: fakeId },
      });

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseService.updateById.mockResolvedValue(expectedCase);

      const response = await caseController.updateById(httpRequest);

      expect(caseService.updateById).toHaveBeenCalledWith(fakeId, updateData);
      expect(response).toMatchObject({
        data: expectedCase,
        status: HttpStatusCode.ok,
      });
    });

    it('should throw BadRequestError if the case id is not provided', async () => {
      const { caseController, caseService } = makeSut();

      const updateData: UpdateCaseDTO = {
        title: 'Pedido de pensão para menores',
        court: 'fakecourt',
      };

      const httpRequest = createMockHttpRequest({ body: updateData });

      await expect(caseController.updateById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.updateById).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if an empty body is provided', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({ params: { id: fakeId } });

      await expect(caseController.updateById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.updateById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the case is not found', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const updateData: UpdateCaseDTO = {
        title: 'Pedido de pensão para menores',
        court: 'fakecourt',
      };

      const httpRequest = createMockHttpRequest({
        body: updateData,
        params: { id: fakeId },
      });

      caseService.updateById.mockResolvedValue(null);

      await expect(caseController.updateById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(caseService.updateById).toHaveBeenCalledWith(fakeId, updateData);
    });
  });

  describe('findById', () => {
    it('should return the case by the provided id and return Ok', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({
        params: { id: fakeId },
      });

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      caseService.findById.mockResolvedValue(expectedCase);

      const response = await caseController.findById(httpRequest);

      expect(caseService.findById).toHaveBeenCalledWith(fakeId, false);
      expect(response).toMatchObject({
        data: expectedCase,
        status: HttpStatusCode.ok,
      });
    });

    it('should throw BadRequestError if the case id is not provided ', async () => {
      const { caseController, caseService } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(caseController.findById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.findById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the case is not found', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({
        params: { id: fakeId },
      });

      caseService.findById.mockResolvedValue(null);

      await expect(caseController.findById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(caseService.findById).toHaveBeenCalledWith(fakeId, false);
    });
  });

  describe('getMyStats', () => {
    it('should return the case stats of the authenticated user and return Ok ', async () => {
      const { caseController, caseService } = makeSut();

      const httpRequest = createMockHttpRequest({
        user: { id: 'it-id', email: 'fake@email.com', role: UserRole.client },
      });

      const expectedStats = { closed: 0, open: 0 };
      caseService.getStatsByClientId.mockResolvedValue(expectedStats);
      const response = await caseController.getMyStats(httpRequest);

      expect(caseService.getStatsByClientId).toHaveBeenCalledWith(httpRequest.user?.id);
      expect(response).toMatchObject({
        data: expectedStats,
        status: HttpStatusCode.ok,
      });
    });

    it('should throw MissingAuthenticatedUserError if the authenticated user is not provided', async () => {
      const { caseController, caseService } = makeSut();
      const httpRequest = createMockHttpRequest({});
      await expect(caseController.getMyStats(httpRequest)).rejects.toThrow(
        MissingAuthenticatedUserError
      );
      expect(caseService.getStatsByClientId).not.toHaveBeenCalled();
    });
  });

  describe('getStats', () => {
    it('should return the global case stats and return Ok', async () => {
      const { caseController, caseService } = makeSut();

      const httpRequest = createMockHttpRequest();

      const expectedStats = { closed: 0, open: 0 };
      caseService.getStats.mockResolvedValue(expectedStats);
      const response = await caseController.getStats(httpRequest);

      expect(caseService.getStats).toHaveBeenCalled();
      expect(response).toMatchObject({
        data: expectedStats,
        status: HttpStatusCode.ok,
      });
    });
  });

  describe('uploadMyFile', () => {
    it('should upload a file and return OK', async () => {
      const { caseController, fileService, fakeId } = makeSut();

      const expectedFile = FileMocker.mockFileDTOWithId();

      const file = createMockFileMulter({ ...expectedFile });
      const userId = 'fakeUserid';
      const httpRequest = createMockHttpRequest({
        user: {
          id: userId,
          email: 'fake@email.com',
          role: UserRole.client,
        },
        params: { id: fakeId },
        file,
      });

      fileService.create.mockResolvedValue(expectedFile);
      const response = await caseController.uploadMyFile(httpRequest);

      expect(fileService.create).toHaveBeenCalledWith(userId, fakeId, file);
      expect(response).toMatchObject({
        data: expectedFile,
        status: HttpStatusCode.ok,
      });
    });

    it('should throw MissingAuthenticatedUserError if the authenticated user is missing', async () => {
      const { caseController, fileService, fakeId } = makeSut();

      const fileMock = FileMocker.mockFileDTOWithId();

      const file = createMockFileMulter({ ...fileMock });
      const httpRequest = createMockHttpRequest({
        params: { id: fakeId },
        file,
      });

      await expect(caseController.uploadMyFile(httpRequest)).rejects.toThrow(
        MissingAuthenticatedUserError
      );
      expect(fileService.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if the case id is missing', async () => {
      const { caseController, fileService } = makeSut();

      const fileMock = FileMocker.mockFileDTOWithId();

      const file = createMockFileMulter({ ...fileMock });
      const httpRequest = createMockHttpRequest({
        user: {
          id: 'user-id',
          email: 'fake@email.com',
          role: UserRole.client,
        },
        file,
      });

      await expect(caseController.uploadMyFile(httpRequest)).rejects.toThrow(BadRequestError);
      expect(fileService.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if the request file is missing', async () => {
      const { caseController, fileService, fakeId } = makeSut();
      const httpRequest = createMockHttpRequest({
        user: {
          id: 'user-id',
          email: 'fake@email.com',
          role: UserRole.client,
        },
        params: { id: fakeId },
      });

      await expect(caseController.uploadMyFile(httpRequest)).rejects.toThrow(BadRequestError);
      expect(fileService.create).not.toHaveBeenCalled();
    });
  });

  describe('findFilesByCaseId', () => {
    it('should find case files and return OK', async () => {
      const { caseController, fileService, fakeId } = makeSut();

      const fileMock = FileMocker.mockFileDTOWithId();
      const page = 1;
      const limit = 4;
      const filePageMock = createMockPage([fileMock], { page, limit });

      fileService.findByOwnerId.mockResolvedValue(filePageMock);

      const httpRequest = createMockHttpRequest({
        params: { id: fakeId },
        query: { limit, page },
      });
      const response = await caseController.findFilesByCaseId(httpRequest);

      expect(fileService.findByOwnerId).toHaveBeenCalledWith(fakeId, { page, limit });
      expect(response).toMatchObject({
        data: filePageMock,
        status: HttpStatusCode.ok,
      });
    });

    it('should return BadRequestError if the case id is missing', async () => {
      const { caseController, fileService } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(caseController.findFilesByCaseId(httpRequest)).rejects.toThrow(BadRequestError);
      expect(fileService.findByOwnerId).not.toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete a case and return No Content', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const expectedCase = CaseMocker.mockCaseDTOWithId();
      const httpRequest = createMockHttpRequest({
        params: { id: fakeId },
      });

      caseService.deleteById.mockResolvedValue(expectedCase);
      const response = await caseController.deleteById(httpRequest);

      expect(caseService.deleteById).toHaveBeenCalledWith(fakeId);
      expect(response).toMatchObject({
        status: HttpStatusCode.no_content,
      });
    });

    it('should throw BadRequestError if the case id is missing', async () => {
      const { caseController, caseService } = makeSut();
      const httpRequest = createMockHttpRequest();
      await expect(caseController.deleteById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.deleteById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the case is not found', async () => {
      const { caseController, caseService, fakeId } = makeSut();

      const httpRequest = createMockHttpRequest({
        params: {
          id: fakeId,
        },
      });

      caseService.deleteById.mockResolvedValue(null);

      await expect(caseController.deleteById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(caseService.deleteById).toHaveBeenCalledWith(fakeId);
    });
  });
});
