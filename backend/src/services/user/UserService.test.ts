import { EntityAlreadyExistsError } from '../../errors/domain/EntityAlreadyExistsError';
import { InvalidNameError } from '../../errors/domain/InvalidNameError';
import { InvalidUserRoleError } from '../../errors/domain/InvalidUserRoleError';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserRole } from '../../types/UserRole';
import { UserService } from './UserService';

describe(`Test ${UserService.name}`, () => {
  function makeSut() {
    const userRepository = createMockUserRepository();
    const userService = new UserService(userRepository);

    return {
      userRepository,
      userService,
    };
  }

  test('should create a new user', async () => {
    const { userService, userRepository } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: UserRole.client,
    };

    await userService.create(newUser);

    expect(userRepository.create).toHaveBeenCalledWith(newUser);
  });

  test('should thow InvalidNameError if firstName or lastName provided is invalid', async () => {
    const { userService } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria4544',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: UserRole.client,
    };
    await expect(userService.create(newUser)).rejects.toThrow(InvalidNameError);
  });

  test('should thow InvalidRoleError if the role provided is invalid', async () => {
    const { userService } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: 'banana',
    };
    await expect(userService.create(newUser)).rejects.toThrow(InvalidUserRoleError);
  });

  test('should throw EntityAlreadyExistsError if the user already exists', async () => {
    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: 'admin',
    };
    const userRepository = createMockUserRepository();

    userRepository.existsByEmail = jest.fn().mockResolvedValue(true);
    const userService = new UserService(userRepository);

    await expect(userService.create(newUser)).rejects.toThrow(EntityAlreadyExistsError);
  });

  test('should find all users', async () => {
    const { userService, userRepository } = makeSut();
    await userService.findAll();
    expect(userRepository.findAll).toHaveBeenCalled();
  });

  test('should find user by id', async () => {
    const { userService, userRepository } = makeSut();
    const id = 'testid--fnsianf';
    await userService.findById(id);
    expect(userRepository.findById).toHaveBeenCalledWith(id);
  });

  test('should find user by email', async () => {
    const { userService, userRepository } = makeSut();
    const email = 'fake@email.com';
    await userService.findByEmail(email);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  test('should call userRepository.existsById with the given id', async () => {
    const { userService, userRepository } = makeSut();
    const id = 'testid-fdfa';
    await userService.existsById(id);
    expect(userRepository.existsById).toHaveBeenCalledWith(id);
  });
});
