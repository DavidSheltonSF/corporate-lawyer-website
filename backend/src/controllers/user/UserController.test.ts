import { UserService } from '../../services/user/UserService';
import { createMockCaseRepository } from '../../tests/mocks/repositories/createMockCaseRepository';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserRole } from '../../types/UserRole';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { UserController } from './UserController';

describe(`Test ${UserController.name}`, () => {
  function makeSut() {
    const userRepository = createMockUserRepository();
    const caseRepository = createMockCaseRepository();

    const userService = new UserService(userRepository, caseRepository);
    const userController = new UserController(userService);

    return {
      userRepository,
      caseRepository,
      userService,
      userController,
    };
  }

  test('should retun OK (200) and call UserRepository.create', async () => {
    const { userController, userRepository } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'Da##54848vvv',
      role: UserRole.client,
    };

    const httpRequest = {
      body: newUser,
    };

    const response = await userController.createClient(httpRequest);

    expect(userRepository.create).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should return UNPROCESSABLE_ENTITY if the user already exists', async () => {
    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: UserRole.admin,
    };

    const httpRequest = {
      body: newUser,
    };
    const userRepository = createMockUserRepository();
    const caseRepository = createMockCaseRepository();

    userRepository.existsByEmail = jest.fn().mockResolvedValue(true);
    const userService = new UserService(userRepository, caseRepository);
    const userController = new UserController(userService);

    const response = await userController.createClient(httpRequest);
    console.log(response);

    expect(response.status).toBe(HttpStatusCode.unprocessable_entity);
  });

  test('should find all users', async () => {
    const { userController, userRepository } = makeSut();
    const response = await userController.findAll({});
    expect(userRepository.findAll).toHaveBeenCalled();
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should find a user by id', async () => {
    const { userController, userRepository } = makeSut();

    const httpRequest = {
      params: { id: 'gfdgfdsgsdggg' },
    };

    const response = await userController.findById(httpRequest);
    expect(userRepository.findById).toHaveBeenCalledWith(httpRequest.params.id);
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should call UserRepository.updatById with the provided data and return OK (200)', async () => {
    const { userRepository, caseRepository } = makeSut();

    const id = 'dfsadfggsfasga';
    const firstName = 'Joares';

    const httpRequest = {
      user: { id: 'ffgrdgag', email: 'test@email.com' },
      params: { id },
      body: {
        firstName,
      },
    };

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

    const response = await userController.updateById(httpRequest);
    expect(userRepository.updateById).toHaveBeenCalledWith(id, { firstName });
    expect(response.status).toBe(HttpStatusCode.ok);
  });

  test('should delete a user by id', async () => {
    const { userRepository, caseRepository } = makeSut();

    const httpRequest = {
      user: { id: 'ffgrdgag', email: 'test@email.com' },
      params: { id: 'gfdgfdsgsdggg' },
    };

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
