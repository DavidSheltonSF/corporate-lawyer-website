import { type Request, type Response } from 'express';
import { badRequest, ok, serverError, unauthorized } from '../helpers/http-helpers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private userService = new UserService(), private authService = new AuthService()) {}

  getMe = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.send(400).send(unauthorized('Token missing'));
    }

    const payload = jwt.decode(token) as JwtPayload;

    const email = payload.email;
    if (!email) {
      return res.send(400).send(unauthorized('Token provided is invalid'));
    }

    const user = await this.userService.findByEmail(email);

    return res.status(200).json(ok(user));
  };

  auth = async (req: Request, res: Response) => {
    try {
      const authService = new AuthService();
      const body = req.body;

      if (!body) {
        return res.status(400).send(badRequest('Body request is missing'));
      }

      const { email, password } = body;

      if (!email) {
        return res.status(400).send(badRequest('Missing email in the body request'));
      }

      if (!password) {
        return res.status(400).send(badRequest('Missing password in the body request'));
      }

      const auth = await this.authService.authenticate(email, password);

      return res.status(200).send(auth);
    } catch (error: any) {
      console.log(error);

      // Check if it is Unauthorized error
      if (error.statusCode === 401) {
        return res.status(error.statusCode).send(unauthorized(error.message));
      }

      return res.status(500).send(serverError('Something went wron in the server side'));
    }
  };
}
