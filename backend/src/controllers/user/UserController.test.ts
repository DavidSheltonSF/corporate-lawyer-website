import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { UserService } from '../../services/user/UserService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { UserRole } from '../../types/UserRole';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { UserController } from './UserController';

describe(`Test ${UserController.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    const lawyerData = UserMocker.mockUserDTOWithId();
    lawyerData.role = UserRole.lawyer;
    userRepository.findById = jest.fn().mockResolvedValue(lawyerData);

    const userService = new UserService(userRepository, caseRepository);
    const userController = new UserController(userService);

    const httpRequest: HttpRequest = {
      params: {
        id: 'fakeId',
      },
      query: {},
      body: {},
      headers: {},
      user: {
        id: 'fakeid',
        email: 'fake@email.com',
      },
    };

    return {
      userRepository,
      caseRepository,
      userService,
      userController,
      httpRequest,
    };
  }

  test('should retun OK (200) and call UserRepository.create if data is valid', async () => {
    const { userController, userRepository, httpRequest } = makeSut();

    const createClientDTO = UserMocker.mockCreateClientDTO();
    httpRequest.body = createClientDTO;

    const response = await userController.createClient(httpRequest);

    expect(userRepository.create).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should throw BadRequestError if there is any missing required field', async () => {
    const { userController, httpRequest } = makeSut();

    let createClientDTO = UserMocker.mockCreateClientDTO();
    const { email, ...clientDTOWithoutEmail } = createClientDTO;
    httpRequest.body = clientDTOWithoutEmail;

    await expect(userController.createClient(httpRequest)).rejects.toThrow(BadRequestError);
  });

  test('should throw EntityAlredyExistsError if the user already exists', async () => {
    const { httpRequest, userRepository, userController } = makeSut();

    let createClientDTO = UserMocker.mockCreateClientDTO();
    httpRequest.body = createClientDTO;

    userRepository.existsByEmail = jest.fn().mockResolvedValue(true);
    await expect(userController.createClient(httpRequest)).rejects.toThrow(
      EntityAlreadyExistsError
    );
  });

  test('should find all users', async () => {
    const { userController, userRepository, httpRequest } = makeSut();

    httpRequest.params = { id: 'gfdgfdsgsdggg' };

    const response = await userController.findAll(httpRequest);
    expect(userRepository.findAll).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should find a user by id', async () => {
    const { userController, userRepository, httpRequest } = makeSut();

    httpRequest.params = { id: 'gfdgfdsgsdggg' };

    const response = await userController.findById(httpRequest);
    expect(userRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call UserRepository.updatById with the provided data and return OK (200)', async () => {
    const { userController, userRepository, httpRequest } = makeSut();

    httpRequest.params = { id: 'gfdgfdsgsdggg' };
    httpRequest.body = {
      firstName: 'Joares',
    };

    const id = httpRequest.params.id;
    const data = httpRequest.body;
    httpRequest.params.firstName;

    const response = await userController.updateById(httpRequest);
    expect(userRepository.updateById).toHaveBeenCalledWith(id, data);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should delete a user by id', async () => {
    const { userController, userRepository, httpRequest } = makeSut();

    const id = 'fakeid';
    httpRequest.params = { id };

    const response = await userController.deleteById(httpRequest);
    expect(userRepository.deleteById).toHaveBeenCalledWith(id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
