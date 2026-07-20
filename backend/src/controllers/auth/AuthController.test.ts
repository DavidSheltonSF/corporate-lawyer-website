import { IAuthService } from '../../services/auth/IAuthService';
import { IUserService } from '../../services/user/IUserService';
import { HttpRequest } from '../types/HttpRequest';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { AuthController } from './AuthController';

describe(`Test ${AuthController.name}`, () => {
  function makeSut() {
    const user = { id: 'user-id', email: 'user@example.com' };
    const findByEmail = jest.fn().mockResolvedValue(user);
    const controller = new AuthController(
      {} as IAuthService,
      { findByEmail } as unknown as IUserService
    );

    return {
      controller,
      findByEmail,
      user,
    };
  }

  test('returns the authenticated user for the request email', async () => {
    const { controller, findByEmail, user } = makeSut();

    const httpRequest: HttpRequest = {
      user,
    };

    const response = await controller.getMe(httpRequest);

    expect(findByEmail).toHaveBeenCalledWith(user.email);
    expect(response).toMatchObject({
      status: HttpStatusCode.ok,
      data: user,
    });
  });
});
