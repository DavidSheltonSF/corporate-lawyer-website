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
import { createMockCaseService } from '../../tests/mocks/services/createMockCaseServiceTest';

describe(`Testing ${CaseController.name}`, () => {
  function makeSut() {
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
    };
  }

  describe('create', () => {
    it('should return the created case and return Created', async () => {
      const { caseController, caseService } = makeSut();

      const createCaseDTO = CaseMocker.mockCreateCaseDTO();

      const httpRequest = createMockHttpRequest({
        body: createCaseDTO,
      });

      const caseMock = CaseMocker.mockCaseDTOWithId();

      caseService.create.mockResolvedValue(caseMock);

      const response = await caseController.create(httpRequest);

      expect(caseService.create).toHaveBeenCalledWith(createCaseDTO);
      expect(response).toEqual(
        expect.objectContaining({
          data: caseMock,
          status: HttpStatusCode.created,
        })
      );
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
    it('should return the updated case and return Ok', async () => {
      const { caseController, caseService } = makeSut();

      const caseWithId = CaseMocker.mockCaseDTOWithId();

      const updatedData: UpdateCaseDTO = {
        title: 'Pedido de pensão para menores',
        court: 'fakecourt',
      };

      const updatedCase = { ...caseWithId, ...updatedData };

      const httpRequest = createMockHttpRequest({
        body: updatedData,
        params: { id: caseWithId.id },
      });

      caseService.updateById.mockResolvedValue(updatedCase);
      const response = await caseController.updateById(httpRequest);

      expect(caseService.updateById).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body);
      expect(response).toEqual(
        expect.objectContaining({
          data: updatedCase,
          status: HttpStatusCode.ok,
        })
      );
    });

    it('should throw BadRequestError if the case id is not provided', async () => {
      const { caseController, caseService } = makeSut();

      const caseWithId = CaseMocker.mockCaseDTOWithId();

      const updatedData: UpdateCaseDTO = {
        title: 'Pedido de pensão para menores',
        court: 'fakecourt',
      };

      const updatedCase = { ...caseWithId, ...updatedData };

      const httpRequest = createMockHttpRequest({ body: updatedData });

      caseService.updateById.mockResolvedValue(updatedCase);

      await expect(caseController.updateById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.updateById).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if an empty body is provided', async () => {
      const { caseController, caseService } = makeSut();

      const caseWithId = CaseMocker.mockCaseDTOWithId();

      const httpRequest = createMockHttpRequest({ params: { id: caseWithId.id } });

      await expect(caseController.updateById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.updateById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the case is not found', async () => {
      const { caseController, caseService } = makeSut();

      const caseWithId = CaseMocker.mockCaseDTOWithId();

      const updatedData: UpdateCaseDTO = {
        title: 'Pedido de pensão para menores',
        court: 'fakecourt',
      };

      const httpRequest = createMockHttpRequest({
        body: updatedData,
        params: { id: caseWithId.id },
      });

      caseService.updateById.mockResolvedValue(null);

      await expect(caseController.updateById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(caseService.updateById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return the case by the provided id and return Ok', async () => {
      const { caseController, caseService } = makeSut();

      const caseWithId = CaseMocker.mockCaseDTOWithId();

      const httpRequest = createMockHttpRequest({
        params: { id: caseWithId.id },
      });

      caseService.findById.mockResolvedValue(caseWithId);

      const response = await caseController.findById(httpRequest);

      expect(caseService.findById).toHaveBeenCalledWith(caseWithId.id, false);
      expect(response).toEqual(
        expect.objectContaining({
          data: caseWithId,
          status: HttpStatusCode.ok,
        })
      );
    });

    it('should throw BadRequestError if the case id is not provided ', async () => {
      const { caseController, caseService } = makeSut();

      const httpRequest = createMockHttpRequest();

      await expect(caseController.findById(httpRequest)).rejects.toThrow(BadRequestError);
      expect(caseService.findById).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError if the case is not found', async () => {
      const { caseController, caseService } = makeSut();

      const caseWithId = CaseMocker.mockCaseDTOWithId();

      const httpRequest = createMockHttpRequest({
        params: { id: caseWithId.id },
      });

      caseService.findById.mockResolvedValue(null);

      await expect(caseController.findById(httpRequest)).rejects.toThrow(NotFoundError);
      expect(caseService.findById).toHaveBeenCalledTimes(1);
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
      expect(response).toEqual(
        expect.objectContaining({
          data: expectedStats,
          status: HttpStatusCode.ok,
        })
      );
    });

    it('should throw MissingAuthenticatedUserError if the authenticated user is not provided', async () => {
      const { caseController, caseService } = makeSut();
      const httpRequest = createMockHttpRequest({});
      await expect(caseController.getMyStats(httpRequest)).rejects.toThrow(
        MissingAuthenticatedUserError
      );
      expect(caseService.findAll).not.toHaveBeenCalled();
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
      expect(response).toEqual(
        expect.objectContaining({
          data: expectedStats,
          status: HttpStatusCode.ok,
        })
      );
    });
  });

  describe('uploadMyFile', () => {
    it('should upload a file and return Ok ', async () => {
      const { caseController, fileService } = makeSut();

      const fileMock = FileMocker.mockFileDTOWithId();

      const file = createMockFileMulter({ ...fileMock });
      const httpRequest = createMockHttpRequest({
        user: {
          id: 'user-id',
          email: 'fake@email.com',
          role: UserRole.client,
        },
        params: { id: 'case-id' },
        file,
      });

      fileService.create.mockResolvedValue(fileMock);
      const response = await caseController.uploadMyFile(httpRequest);

      expect(fileService.create).toHaveBeenCalledWith(
        httpRequest.user?.id,
        httpRequest.params.id,
        file
      );
      expect(response).toEqual(
        expect.objectContaining({
          data: fileMock,
          status: HttpStatusCode.ok,
        })
      );
    });

    it('should return MissingAuthenticatedUserError if the authenticated user is missing', async () => {
      const { caseController, fileService } = makeSut();

      const fileMock = FileMocker.mockFileDTOWithId();

      const file = createMockFileMulter({ ...fileMock });
      const httpRequest = createMockHttpRequest({
        params: { id: 'case-id' },
        file,
      });

      await expect(caseController.uploadMyFile(httpRequest)).rejects.toThrow(
        MissingAuthenticatedUserError
      );
      expect(fileService.create).not.toHaveBeenCalled();
    });

    it('should return BadRequestError if the case id missing', async () => {
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

    it('should return BadRequestError if request file is misssing', async () => {
      const { caseController, fileService } = makeSut();
      const httpRequest = createMockHttpRequest({
        user: {
          id: 'user-id',
          email: 'fake@email.com',
          role: UserRole.client,
        },
        params: { id: 'case-id' },
      });

      await expect(caseController.uploadMyFile(httpRequest)).rejects.toThrow(BadRequestError);
      expect(fileService.create).not.toHaveBeenCalled();
    });
  });

  describe('findFilesByCaseId', () => {
    it('should return a list of files and return 200', async () => {
      const { caseController, fileService } = makeSut();

      const fileMock = FileMocker.mockFileDTOWithId();
      const page = 1;
      const limit = 4;
      const filePageMock = createMockPage([fileMock], { page, limit });

      fileService.findByOwnerId.mockResolvedValue(filePageMock);

      const caseId = 'case-fake-id';
      const httpRequest = createMockHttpRequest({ params: { id: caseId }, query: { limit, page } });
      const response = await caseController.findFilesByCaseId(httpRequest);

      expect(fileService.findByOwnerId).toHaveBeenCalledWith(caseId, { page, limit });
      expect(response).toEqual(
        expect.objectContaining({
          data: filePageMock,
          status: HttpStatusCode.ok,
        })
      );
    });

    it('should return BadRequestError if the case id is missing', async () => {
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

      await expect(caseController.findFilesByCaseId(httpRequest)).rejects.toThrow(BadRequestError);
      expect(fileService.findByOwnerId).not.toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete a case and return No Content', async () => {
      const { caseController, caseService } = makeSut();

      const caseMock = CaseMocker.mockCaseDTOWithId();
      const httpRequest = createMockHttpRequest({
        params: {
          id: caseMock.id,
        },
      });

      caseService.deleteById.mockResolvedValue(caseMock);
      const response = await caseController.deleteById(httpRequest);

      expect(caseService.deleteById).toHaveBeenCalledWith(caseMock.id);
      expect(response.status).toBe(HttpStatusCode.no_content);
      expect(response).toEqual(
        expect.objectContaining({
          status: HttpStatusCode.no_content,
        })
      );
    });

    it('should throw BadRequestError if the case id is missing', async () => {
      const { caseController } = makeSut();
      const httpRequest = createMockHttpRequest();
      await expect(caseController.deleteById(httpRequest)).rejects.toThrow(BadRequestError);
    });

    it('should throw NotFoundError if the case is not found', async () => {
      const { caseController, caseService } = makeSut();

      const httpRequest = createMockHttpRequest({
        params: {
          id: 'fake-id',
        },
      });

      caseService.deleteById.mockResolvedValue(null);

      await expect(caseController.deleteById(httpRequest)).rejects.toThrow(NotFoundError);
    });
  });
});
