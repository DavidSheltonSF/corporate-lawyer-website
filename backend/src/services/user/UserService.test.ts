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

  test('should find all users', async () => {
    const { userService, userRepository } = makeSut();
    await userService.findAll();
    expect(userRepository.findAll).toHaveBeenCalled();
  });
});
