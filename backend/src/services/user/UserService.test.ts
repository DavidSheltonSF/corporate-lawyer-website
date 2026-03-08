import { InvalidRoleError } from '../../errors/domain/InvalidRoleError';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { UserRole } from '../../types/UserRole';
import { UserService } from './UserService';

describe('Test UserService', () => {
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

  test('should create a new user', async () => {
    const { userService } = makeSut();

    const newUser = {
      firstName: 'David',
      lastName: 'Faria',
      cpf: '18877748777',
      email: 'david@email.com',
      password: 'david123',
      role: 'banana',
    };
    await expect(userService.create(newUser)).rejects.toThrow(InvalidRoleError);
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
});
