import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserService } from '../../services/user/IUserService';
import { IAuthService } from '../../services/auth/IAuthService';
import { IAuthController } from './IAuthController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { getMissingFields } from '../../helpers/getMissingFields';
import { HttpRequest } from '../types/HttpRequest';

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService, private userService: IUserService) {}

  getMe = async (httpRequest: HttpRequest) => {
    const token = httpRequest.headers.authorization;

    if (!token) {
      return HttpResponseFactory.makeUnauthorized('Token missing');
    }

    const payload = jwt.decode(token) as JwtPayload;

    const email = payload.email;
    if (!email) {
      return HttpResponseFactory.makeUnauthorized('Token provided is invalid');
    }

    const user = await this.userService.findByEmail(email);

    return HttpResponseFactory.makeOk(user);
  };

  auth = async (httpRequest: HttpRequest) => {
    try {
      const body = httpRequest.body;

      if (!body) {
        return HttpResponseFactory.makeBadRequest('Body request is missing');
      }

      const missingFields = getMissingFields(body, ['email', 'password']);

      if (missingFields.length > 0) {
        return HttpResponseFactory.makeBadRequest(
          `Missing required ${missingFields} fields in request body`
        );
      }

      const { email, password } = body;

      const response = await this.authService.authenticate(email, password);

      if (response.message) {
        return HttpResponseFactory.makeUnauthorized(response.message);
      }

      return HttpResponseFactory.makeOk(response.token);
    } catch (error: any) {
      console.log(error);

      // Check if it is Unauthorized error
      if (error.statusCode === 401) {
        return HttpResponseFactory.makeUnauthorized(error.message);
      }

      return HttpResponseFactory.makeServerError(error.message);
    }
  };
}
