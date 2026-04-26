import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { UserService } from '../../services/user/UserService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserRole } from '../../types/UserRole';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { UserController } from './UserController';

describe(`Test ${UserController.name}`, () => {
  function makeSut() {
    const caseRepository = createMockCaseRepository();
    const userRepository = createMockUserRepository();
    userRepository.findById = jest.fn().mockResolvedValue({
      id: 'dfasfaf',
      firstName: 'José',
      lastName: 'Miranda',
      email: 'testando@email',
      cpf: '55422888744',
      role: 'lawyer',
    });

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

  test('should retun OK (200) and call UserRepository.create', async () => {
    const { userController, userRepository, httpRequest } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'Da##54848vvv',
      role: UserRole.client,
    };

    httpRequest.body = newUser;

    const response = await userController.createClient(httpRequest);

    expect(userRepository.create).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should throw BadRequestError if there is any missing required field', async () => {
    const { userController, httpRequest } = makeSut();

    // Missing email
    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
    };
    httpRequest.body = newUser;

    await expect(userController.createClient(httpRequest)).rejects.toThrow(BadRequestError);
  });

  test('should throw EntityAlredyExistsError if the user already exists', async () => {
    const { httpRequest, userRepository, userController } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: UserRole.admin,
    };

    httpRequest.body = newUser;

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
    const { userRepository, caseRepository, httpRequest } = makeSut();

    httpRequest.params = { id: 'gfdgfdsgsdggg' };

    userRepository.findById = jest.fn().mockResolvedValue({
      id: 'dfasfaf',
      firstName: 'José',
      lastName: 'Miranda',
      email: 'testando@email',
      cpf: '55422888744',
      role: 'lawyer',
    });
    const userService = new UserService(userRepository, caseRepository);
    const userController = new UserController(userService);
    const response = await userController.deleteById(httpRequest);
    expect(userRepository.deleteById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });
});
