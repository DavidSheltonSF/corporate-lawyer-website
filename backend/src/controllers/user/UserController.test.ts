import { UserService } from '../../services/user/UserService';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserRole } from '../../types/UserRole';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { UserController } from './UserController';

describe(`Test ${UserController.name}`, () => {
  function makeSut() {
    const userRepository = createMockUserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return {
      userRepository,
      userService,
      userController,
    };
  }

  test('should create a new user', async () => {
    const { userController, userRepository } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: UserRole.client,
    };

    const httpRequest = {
      body: newUser,
    };

    const response = await userController.create(httpRequest);

    expect(userRepository.create).toHaveBeenCalledWith(newUser);
    expect(response.status).toBe(HttpStatusCode.created);
  });

  test('should return UNPROCESSABLE_ENTITY (422) if the provided role is invalid', async () => {
    const { userController, userRepository } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: 'banana',
    };

    const httpRequest = {
      body: newUser,
    };

    const response = await userController.create(httpRequest);

    expect(response.status).toBe(HttpStatusCode.unprocessable_entity);
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

    userRepository.existsByEmail = jest.fn().mockResolvedValue(true);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const response = await userController.create(httpRequest);
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
});
