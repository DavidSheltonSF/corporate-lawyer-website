import { MissingAuthenticatedUserError } from '../../errors/presentation/MissingAuthenticatedUserError';
import { IAuthService } from '../../services/auth/IAuthService';
import { IUserService } from '../../services/user/IUserService';
import { UserMocker } from '../../tests/mocks/entities/UserMocker';
import { createMockObject } from '../../tests/mocks/createMockObject';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { AuthController } from './AuthController';
import { createMockHttpRequest } from '../../tests/mocks/createMockHttpRequest';

describe(`Test ${AuthController.name}`, () => {
  function makeSut() {
    const authUser = {
      id: 'user-id',
      email: 'user@example.com',
    };
    const mockAuthService = createMockObject<IAuthService>(['authenticate']);
    const mockUserService = createMockObject<IUserService>(['findByEmail']);
    const controller = new AuthController(mockAuthService, mockUserService);

    return {
      controller,
      mockUserService,
      authUser,
    };
  }

  test('returns the authenticated user for the request email', async () => {
    const { controller, mockUserService, authUser } = makeSut();

    const httpRequest = createMockHttpRequest({ user: authUser });

    const mockUser = UserMocker.mockUserDTOWithId();

    mockUserService.findByEmail.mockResolvedValue(mockUser);

    const response = await controller.getMe(httpRequest);

    expect(mockUserService.findByEmail).toHaveBeenCalledWith(authUser.email);
    expect(response).toMatchObject({
      status: HttpStatusCode.ok,
      data: mockUser,
    });
  });

  test('throws MissingAuthenticatedUserError when no authenticated user is present', async () => {
    const { controller } = makeSut();
    const httpRequest = createMockHttpRequest();

    await expect(controller.getMe(httpRequest)).rejects.toThrow(MissingAuthenticatedUserError);
  });
});
