import { type Request, type Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserService } from '../../services/user/IUserService';
import { IAuthService } from '../../services/auth/IAuthService';
import { IAuthController } from './IAuthController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { getMissingFields } from '../../helpers/getMissingFields';

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService, private userService: IUserService) {}

  getMe = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.send(400).send(HttpResponseFactory.makeUnouthorized({ message: 'Token missing' }));
    }

    const payload = jwt.decode(token) as JwtPayload;

    const email = payload.email;
    if (!email) {
      return res
        .send(400)
        .send(HttpResponseFactory.makeUnouthorized({ message: 'Token provided is invalid' }));
    }

    const user = await this.userService.findByEmail(email);

    return res.status(200).json(HttpResponseFactory.makeOk({ data: user }));
  };

  auth = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      if (!body) {
        return res
          .status(400)
          .send(HttpResponseFactory.makeBadRequest({ message: 'Body request is missing' }));
      }

      const missingFields = getMissingFields(body, ['email', 'password']);

      if (missingFields.length > 0) {
        return res.status(400).send(
          HttpResponseFactory.makeBadRequest({
            message: 'Missing required fields in request body',
            data: missingFields,
          })
        );
      }

      const { email, password } = body;

      const auth = await this.authService.authenticate(email, password);

      return res.status(200).send(HttpResponseFactory.makeOk({ data: auth }));
    } catch (error: any) {
      console.log(error);

      // Check if it is Unauthorized error
      if (error.statusCode === 401) {
        return res
          .status(error.statusCode)
          .send(HttpResponseFactory.makeUnouthorized({ message: error.message }));
      }

      return res.status(500).send(HttpResponseFactory.makeServerError({ message: error.message }));
    }
  };
}
