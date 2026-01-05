import { type Request, type Response } from 'express';
import { badRequest, notFound, ok, serverError } from '../helpers/http-helpers';
import { ICaseService } from '../services/ICaseService';
import { IUserService } from '../services/IUserService';

export class CaseController {
  constructor(private caseService: ICaseService, private userService: IUserService) {}

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { populate } = req.query;

      const populateFilds = String(populate).split(',');

      if (!id) {
        return res.status(400).send(badRequest('Missing id param'));
      }

      const foundCase = await this.caseService.findById(id, populateFilds);

      return res.status(200).send(ok(foundCase));
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return res.status(error.statusCode).send(notFound(error.message));
      }

      return res.status(500).send(serverError(error.message));
    }
  };

  findByClientId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, query, populate } = req.query;

    const populateFields = String(populate).split(',');

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    if (!id) {
      return res.status(400).send(badRequest('Missing id param'));
    }

    const casesPaginated = await this.caseService.findAll(
      {
        query: query ? String(query) : undefined,
        status: status ? String(status) : undefined,
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
        client: id ? String(id) : undefined,
      },
      populateFields
    );

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    return res.status(200).send(ok(pagination));
  };

  getStatsByClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send(badRequest('Missing id param'));
      }

      const clientExists = await this.userService.findById(id);

      if (!clientExists) {
        return res.status(404).send(notFound('Client not found'));
      }

      const caseStats = await this.caseService.getStats(id);

      return res.status(200).send(ok(caseStats));
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(serverError(error.message));
    }
  };
}
