import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { IAuthService } from '../../services/auth/IAuthService';
import { IUserService } from '../../services/user/IUserService';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { createMockObject } from '../../tests/mocks/createMockObject';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { AuthController } from './AuthController';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';
import { UserRole } from '../../types/UserRole';
import { ValidationError } from '../../errors/presentation/ValidationError';

describe(`Test ${AuthController.name}`, () => {
  function makeSut() {
    const authUser = {
      id: 'user-id',
      email: 'user@example.com',
      role: UserRole.lawyer,
    };
    const authSevice = createMockObject<IAuthService>(['authenticate']);
    const userService = createMockObject<IUserService>(['findByEmail']);
    const authController = new AuthController(authSevice, userService);

    return {
      authSevice,
      userService,
      authUser,
      authController,
    };
  }

  describe('getMe', () => {
    it('should return the authenticated user for the request email', async () => {
      const { authController, userService, authUser } = makeSut();

      const httpRequest = createMockHttpRequest({ user: authUser });

      const mockUser = UserMocker.mockUserDTOWithId();

      userService.findByEmail.mockResolvedValue(mockUser);

      const response = await authController.getMe(httpRequest);

      expect(userService.findByEmail).toHaveBeenCalledWith(authUser.email);
      expect(response).toMatchObject({
        status: HttpStatusCode.ok,
        data: mockUser,
      });
    });

    it('should throw MissingAuthenticatedUserError when no authenticated user is present', async () => {
      const { authController } = makeSut();
      const httpRequest = createMockHttpRequest();

      await expect(authController.getMe(httpRequest)).rejects.toThrow(
        MissingAuthenticatedUserError
      );
    });
  });

  describe('authenticate', () => {
    it('should throw ValidationError when invalid credentials are provided', async () => {
      const { authController, authSevice } = makeSut();
      const httpRequest = createMockHttpRequest({
        body: {
          email: 'invalie@email.com',
          password: 'invalidPassword',
        },
      });

      authSevice.authenticate.mockResolvedValue({
        token: null,
        invalidFields: { email: 'invalid email', password: 'invalid password' },
      });

      await expect(authController.authenticate(httpRequest)).rejects.toThrow(ValidationError);
    });
  });
});
