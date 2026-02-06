import { type Request, type Response } from 'express';
import { ICaseService } from '../../services/case/ICaseService';
import { IUserService } from '../../services/user/IUserService';
import { ICaseController } from './ICaseController';
import { HttpResponseFactory } from '../../factories/HttpResponse/HttpResponseFactory';
import { AuthenticatedUser } from '../../types/AuthenticatedUser';

export class CaseController implements ICaseController {
  constructor(private caseService: ICaseService, private userService: IUserService) {}

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { populate } = req.query;

      const populateFilds = String(populate).split(',');

      if (!id) {
        return res
          .status(400)
          .send(HttpResponseFactory.makeBadRequest({ message: 'Missing id param' }));
      }

      const foundCase = await this.caseService.findById(id, populateFilds);

      return res.status(200).send(HttpResponseFactory.makeOk({ data: foundCase }));
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return res
          .status(error.statusCode)
          .send(HttpResponseFactory.makeNotFound({ message: error.message }));
      }

      return res.status(500).send(HttpResponseFactory.makeServerError({ message: error.message }));
    }
  };

  findByClient = async (req: Request, res: Response) => {
    const authReq = req as Request & AuthenticatedUser;
    const id = authReq.user.id;

    const { status, query } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    if (!id) {
      return res
        .status(400)
        .send(HttpResponseFactory.makeBadRequest({ message: 'Missing id param' }));
    }

    const casesPaginated = await this.caseService.findCases({
      query: query ? String(query) : undefined,
      status: status ? String(status) : undefined,
      limit: limit ? Number(limit) : undefined,
      page: page ? Number(page) : undefined,
      client: id ? String(id) : undefined,
    });

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    return res.status(200).send(HttpResponseFactory.makeOk({ data: pagination }));
  };

  getStatsByClient = async (req: Request, res: Response) => {
    try {
      const authReq = req as Request & AuthenticatedUser;
      const id = authReq.user.id;
      const clientExists = await this.userService.findById(id);

      if (!clientExists) {
        return res
          .status(404)
          .send(HttpResponseFactory.makeNotFound({ message: 'Client not found' }));
      }

      const caseStats = await this.caseService.getStats(id);

      return res.status(200).send(HttpResponseFactory.makeOk({ data: caseStats }));
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(HttpResponseFactory.makeServerError({ message: error.message }));
    }
  };

  addFile = async (req: Request, res: Response) => {
    try {
      const authReq = req as Request & AuthenticatedUser;
      const userId = authReq.user.id;
      const caseId = req.params.id;

      if (!userId) {
        return res
          .status(400)
          .json(HttpResponseFactory.makeBadRequest({ message: 'Missing userId' }));
      }
      if (!caseId) {
        return res
          .status(400)
          .json(HttpResponseFactory.makeBadRequest({ message: 'Missing case' }));
      }

      const file = req.file;

      if (!file) {
        return res
          .status(400)
          .json(HttpResponseFactory.makeBadRequest({ message: 'Missing file' }));
      }

      const fixedName = Buffer.from(file.originalname, 'latin1').toString('utf8');

      const response = await this.caseService.addFile(caseId, {
        name: fixedName,
        url: 'www.fakeUrl/' + Number(new Date()).toString(),
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: String(userId),
      });

      return res.status(200).json(HttpResponseFactory.makeOk({ data: response }));
    } catch (error: any) {
      return res.status(500).json(HttpResponseFactory.makeServerError({ message: error }));
    }
  };

  findFilesByCaseId = async (req: Request, res: Response) => {
    const caseId = req.params.id;

    if (!caseId) {
      return res
        .status(400)
        .json(HttpResponseFactory.makeBadRequest({ message: 'Missing case id' }));
    }

    const caseFiles = await this.caseService.findFilesByCaseId(String(caseId));

    if (!caseFiles) {
      return res
        .status(404)
        .json(
          HttpResponseFactory.makeNotFound({ message: `Case with id ${caseId} was not found` })
        );
    }

    return res.status(200).json(HttpResponseFactory.makeOk({ data: caseFiles }));
  };
}
