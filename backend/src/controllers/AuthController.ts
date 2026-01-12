import { type Request, type Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserService } from '../services/IUserService';
import { IAuthService } from '../services/IAuthService';
import { IAuthController } from './IAuthController';
import { HttpResponseFactory } from '../factories/HttpResponse/HttpResponseFactory';

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

      const { email, password } = body;

      if (!email) {
        return res
          .status(400)
          .send(
            HttpResponseFactory.makeBadRequest({ message: 'Missing email in the body request' })
          );
      }

      if (!password) {
        return res
          .status(400)
          .send(
            HttpResponseFactory.makeBadRequest({ message: 'Missing password in the body request' })
          );
      }

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

      return res.status(500).send(HttpResponseFactory.makeServerError(error.message));
    }
  };
}
