import { UpdateCaseDTO } from '../../dtos/case/UpdateCaseDTO';
import { CaseService } from '../../services/case/CaseService';
import { UserService } from '../../services/user/UserService';
import { CaseMocker } from '../../tests/mocks/entities/CaseMoker';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { UserRole } from '../../types/UserRole';

import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { CaseController } from './CaseController';

describe(`Test ${CaseController.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    const lawyerData = UserMocker.mockUserDTOWithId();
    lawyerData.role = UserRole.lawyer;
    userRepository.findById = jest.fn().mockResolvedValue(lawyerData);

    const userService = new UserService(userRepository, caseRepository);
    const caseService = new CaseService(caseRepository);

    const caseController = new CaseController(caseService, userService);

    const httpRequest: HttpRequest = {
      params: {
        id: 'fakeId',
      },
      query: {},
      body: {},
      headers: {},
      user: {
        id: lawyerData.id,
        email: 'lawyer@email.com',
      },
    };

    return {
      caseRepository,
      userRepository,
      caseService,
      caseController,
      httpRequest,
    };
  }

  test('should call CaseRepository.create and return 201', async () => {
    const { caseController, caseRepository, userRepository, httpRequest } = makeSut();

    const createCaseDTO = CaseMocker.mockCreateCaseDTO();

    httpRequest.body = createCaseDTO;

    const response = await caseController.create(httpRequest);
    expect(caseRepository.create).toHaveBeenCalledWith(createCaseDTO);
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should call CaseRepository.updateById and return 200', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const updatedData: UpdateCaseDTO = {
      title: 'Pedido de penção para menores',
      court: 'fakecourt',
    };

    httpRequest.body = updatedData;
    httpRequest.params = { id: 'fdsfafdfaffa' };

    const response = await caseController.updateById(httpRequest);

    expect(caseRepository.updateById).toHaveBeenCalledWith(httpRequest.params.id, httpRequest.body);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with the provided id and return OK (200)', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.findById(httpRequest);

    expect(caseRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findPopulatedById with the provided id and return OK (200)', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    httpRequest.query.populate = 'true';

    const response = await caseController.findById(httpRequest);

    expect(caseRepository.findPopulatedById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findCases with provided data and return OK (200)', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const status = 'open';
    const limit = 4;
    const page = 1;
    const query = 'Query string,';

    httpRequest.query = {
      status,
      query,
      page,
      limit,
    };

    const response = await caseController.findMyCases(httpRequest);

    expect(caseRepository.findPopulatedByClientId).toHaveBeenCalledWith(httpRequest.user?.id, {
      status,
      limit,
      page,
      query,
    });
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.getStatsByClientId with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.getMyStats(httpRequest);
    console.log(response);

    expect(caseRepository.getStatsByClientId).toHaveBeenCalledWith(httpRequest.user?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.addFile with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const file = {
      originalname: 'Document x',
      size: 200,
      mimeType: 'pdf',
    };

    httpRequest.file = file;

    const response = await caseController.uploadMyFile(httpRequest);

    expect(caseRepository.addFile).toHaveBeenCalled();
    expect(response?.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with provided id and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.findFilesByCaseId(httpRequest);

    expect(caseRepository.findFilesByCaseId).toHaveBeenCalledWith(httpRequest.params?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.deleteById with provided id and return OK (200) ', async () => {
    const { caseController, caseRepository, httpRequest } = makeSut();

    const response = await caseController.findFilesByCaseId(httpRequest);

    expect(caseRepository.findFilesByCaseId).toHaveBeenCalledWith(httpRequest.params?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
