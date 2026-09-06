import { describe, expect, it } from 'vitest';
import { createMockUserRepository } from '../../tests/mocks/repositories/createMockUserRepository';
import { AuthService } from './AuthService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';

describe(`Test ${AuthService.name}`, () => {
  function makeSut() {
    const userRepository = createMockUserRepository();
    const authService = new AuthService(userRepository);
    const email = 'fake@email.com';
    const password = '1158148548';

    return {
      userRepository,
      authService,
      email,
      password,
    };
  }

  describe('authenticate', () => {
    it('should return a valid token', async () => {
      const { userRepository, authService } = makeSut();

      // Mock the user returned by the repository
      const expectedUser = UserMocker.mockUserDTOWithId();

      // Get the user credentials
      const { email, password } = expectedUser;

      // Hash the user password
      expectedUser.password = await bcrypt.hash(expectedUser.password, 10);

      // Mock the repository return
      userRepository.findByEmail.mockResolvedValue(expectedUser);

      // Authenticate
      const { token, invalidFields } = await authService.authenticate(email, password);

      // Decode the returned token
      const decoded = jwt.verify(token!, process.env.API_SECRET!);

      expect(invalidFields).toBeUndefined();
      expect(userRepository.findByEmail).toHaveBeenCalledWith(expectedUser.email);
      expect(decoded).toMatchObject({
        sub: expectedUser.id,
        email: expectedUser.email,
      });
    });

    it('should return email as an invalid field and token as null if the user is not found', async () => {
      const { userRepository, authService, email, password } = makeSut();

      userRepository.findByEmail.mockResolvedValue(null);
      const { token, invalidFields } = await authService.authenticate(email, password);

      expect(token).toBeNull();
      expect(invalidFields).toEqual({
        email: 'Invalid email',
        password: null,
      });
    });

    it('should return password as an invalid field and token as null if the password provided is invalid', async () => {
      const { userRepository, authService, email, password } = makeSut();

      // User with other password
      const expectedUser = UserMocker.mockUserDTOWithId();
      userRepository.findByEmail.mockResolvedValue(expectedUser);
      const { token, invalidFields } = await authService.authenticate(email, password);

      expect(token).toBeNull();
      expect(invalidFields).toEqual({
        password: 'Invalid password',
        email: null,
      });
    });
  });
});
