import { CaseService } from '../../services/case/CaseService';
import { UserService } from '../../services/user/UserService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { CaseController } from './CaseController';

describe(`Test ${CaseController.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    const userService = new UserService(userRepository);
    const caseService = new CaseService(caseRepository);
    const caseController = new CaseController(caseService, userService);

    return {
      caseRepository,
      caseService,
      caseController,
    };
  }

  // test('should create a new case', async () => {
  //   const { caseController, caseRepository } = makeSut();

  //   const newCase: CreateCaseDTO = {
  //     title: 'Case Title',
  //     client: 'fakeid',
  //     court: 'fakecourt',
  //     courtDivision: 'fakecourtdivision',
  //     description: 'description bla bla',
  //     lawyers: ['fakeidiii'],
  //     processNumber: '21454651554',
  //     status: CaseStatusEnum.aberto,
  //   };

  //   const httpRequest = {
  //     body: newCase,
  //   };

  //   const response = await caseController.create(httpRequest);

  //   expect(caseRepository.create).toHaveBeenCalledWith(newCase);
  //   expect(response.status).toBe(HttpStatusCode.created);
  // });

  test('should call caseRepository.findById with the provided id and return OK (200)', async () => {
    const { caseController, caseRepository } = makeSut();

    const httpRequest = {
      params: {
        id: 'fakeId',
      },
    };

    const response = await caseController.findById(httpRequest);

    expect(caseRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findCases with provided data and return OK (200)', async () => {
    const { caseController, caseRepository } = makeSut();

    const status = 'open';
    const limit = 4;
    const page = 1;
    const query = 'Query string,';

    const httpRequest: HttpRequest = {
      user: {
        id: 'fakeId',
        email: 'user@email.com',
      },

      query: {
        status,
        query,
        page,
        limit,
      },
    };

    const response = await caseController.findMyCases(httpRequest);

    expect(caseRepository.findCases).toHaveBeenCalledWith({
      client: httpRequest.user?.id,
      status,
      limit,
      page,
      query,
    });
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.getStatsByClientId with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository } = makeSut();

    const httpRequest: HttpRequest = {
      user: {
        id: 'fakeId',
        email: 'user@email.com',
      },
    };

    const response = await caseController.getMyStats(httpRequest);

    expect(caseRepository.getStatsByClientId).toHaveBeenCalledWith(httpRequest.user?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.addFile with provided data and return OK (200) ', async () => {
    const { caseController, caseRepository } = makeSut();

    const file = {
      originalname: 'Document x',
      size: 200,
      mimeType: 'pdf',
    };

    const httpRequest: HttpRequest = {
      user: {
        id: 'fakeId',
        email: 'user@email.com',
      },

      params: {
        id: 'fakeCaseId',
      },

      file,
    };

    const response = await caseController.uploadMyFile(httpRequest);

    expect(caseRepository.addFile).toHaveBeenCalled();
    expect(response?.status).toBe(HttpStatusCode.ok);
  });

  test('should call caseRepository.findById with provided id and return OK (200) ', async () => {
    const { caseController, caseRepository } = makeSut();
    const httpRequest: HttpRequest = {
      params: {
        id: 'fakeCaseId',
      },
    };

    const response = await caseController.findFilesByCaseId(httpRequest);

    expect(caseRepository.findFilesByCaseId).toHaveBeenCalledWith(httpRequest.params?.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
