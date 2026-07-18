import { Request, Response } from 'express';
import { HttpRequest } from '../../controllers/types/HttpRequest';
import { HttpResponse } from '../../controllers/types/HttpResponse';
import { AuthenticatedUser } from '../../types/AuthenticatedUser';

export function expressHttpAdapter<T>(
  controllerHandler: (httpRequest: HttpRequest) => Promise<HttpResponse<T>>
) {
  return async (req: Request, res: Response) => {
    const authReq = req as Request & { user: AuthenticatedUser };
    const httpRequest: HttpRequest = {
      body: authReq.body,
      params: authReq.params,
      headers: authReq.headers,
      query: authReq.query,
      file: authReq.file ?? null,
      user: authReq.user,
    };

    const result = await controllerHandler(httpRequest);
    return res.status(result.status).json(result);
  };
}
