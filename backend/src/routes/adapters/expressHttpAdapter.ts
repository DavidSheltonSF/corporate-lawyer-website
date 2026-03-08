import { Request, Response, type RequestHandler } from 'express';
import { HttpRequest } from '../../controllers/types/HttpRequest';
import { HttpResponse } from '../../controllers/types/HttpResponse';

export function expressHttpAdapter<T>(
  controllerHandler: (httpRequest: HttpRequest) => HttpResponse<T>
): RequestHandler {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const result = controllerHandler(httpRequest);
    return res.status(result.status).json(result);
  };
}
