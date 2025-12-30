import { type Request, type Response } from 'express';
import { CaseService } from '../services/case.service';

export class CaseController {
  private caseService = new CaseService();

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { populate } = req.query;

      const populateFilds = String(populate).split(',');

      if (!id) {
        return res.status(400).send({
          code: 'BAD_REQUEST',
          message: 'Missing id param',
        });
      }

      const foundCase = await this.caseService.findById(id, populateFilds);

      return res.status(200).send({
        data: foundCase,
      });
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return res.status(error.statusCode).send({
          code: error.code,
          message: error.message,
        });
      }

      return res.status(500).send({
        message: 'Something went wron in the server side',
      });
    }
  };

  findByClientId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, query, populate } = req.query;

    const populateFields = String(populate).split(',');

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    if (!id) {
      return res.status(400).send({
        status: 400,
        message: 'Missing id param',
      });
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

    const response: any = {
      status: 200,
      data: pagination,
    };
    return res.status(200).send(response);
  };
}
