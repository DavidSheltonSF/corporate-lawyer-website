import { type Request, type Response } from 'express';
import { ICaseService } from '../services/ICaseService';
import { IUserService } from '../services/IUserService';
import { ICaseController } from './ICaseController';
import { CasePopulateOptions } from '../types/CasePopulateOptions';
import { HttpResponseFactory } from '../factories/HttpResponse/HttpResponseFactory';

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

  findByClientId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, query, populate } = req.query;

    const populateFields = String(populate).split(',');
    const casePopulateFields: CasePopulateOptions = {};

    casePopulateFields.client = populateFields.includes('client') ? true : false;
    casePopulateFields.lawyers = populateFields.includes('lawyers') ? true : false;
    casePopulateFields.documents = populateFields.includes('documents') ? true : false;
    casePopulateFields.hearings = populateFields.includes('hearings') ? true : false;

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    if (!id) {
      return res
        .status(400)
        .send(HttpResponseFactory.makeBadRequest({ message: 'Missing id param' }));
    }

    const casesPaginated = await this.caseService.findCaseCards(
      {
        query: query ? String(query) : undefined,
        status: status ? String(status) : undefined,
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
        client: id ? String(id) : undefined,
      },
      casePopulateFields
    );

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    return res.status(200).send(HttpResponseFactory.makeOk({ data: pagination }));
  };

  getStatsByClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .send(HttpResponseFactory.makeBadRequest({ message: 'Missing id param' }));
      }

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
}
