import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserService } from '../../services/user/IUserService';
import { IAuthService } from '../../services/auth/IAuthService';
import { IAuthController } from './IAuthController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { getMissingFields } from '../../utils/getMissingFields';
import { HttpRequest } from '../types/HttpRequest';
import { UnauthorizedError } from '../../errors/presentation/UnauthorizedError';
import { BadRequestError } from '../../errors/presentation/BadRequestError';
import { ValidationError } from '../../errors/presentation/ValidationError';

export class AuthController implements IAuthController {
  constructor(
    private authService: IAuthService,
    private userService: IUserService
  ) {}

  getMe = async (httpRequest: HttpRequest) => {
    const token = httpRequest.headers.authorization;

    if (!token) {
      throw new UnauthorizedError('Token missing');
    }

    const payload = jwt.decode(token) as JwtPayload;

    const email = payload.email;
    if (!email) {
      throw new UnauthorizedError('Token provided is invalid');
    }

    const user = await this.userService.findByEmail(email);

    return HttpResponseFactory.makeOk(user);
  };

  auth = async (httpRequest: HttpRequest) => {
    const body = httpRequest.body;

    if (!body) {
      throw new BadRequestError('Body request is missing');
    }

    const missingFields = getMissingFields(body, ['email', 'password']);

    if (missingFields.length > 0) {
      throw new BadRequestError(`Missing required ${missingFields} fields in request body`);
    }

    const { email, password } = body;

    const response = await this.authService.authenticate(email, password);

    if (response.invalidFields) {
      throw new ValidationError('Invalid data',{fields: {...response.invalidFields}} );
    }

    return HttpResponseFactory.makeOk(response.token);
  };
}
