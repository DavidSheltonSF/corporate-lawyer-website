import { paginate } from '@/helpers/paginate';
import { fakeCases } from '../../fakeDatabase/cases';
import { filterCasesByTitle } from '@/lib/filterCasesByTitle';
import { filterCasesByProcessNumber } from '@/lib/filterCasesByProcessNumber';
import { HttpResponse } from '@/types/HttpResponse';
import { getQueryParam } from '@/helpers/getQueryParam';

export async function GET(req: Request, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;

  const title = getQueryParam(req, 'title');
  const processNumber = getQueryParam(req, 'processNumber');
  const page = Number(getQueryParam(req, 'page')) || 1;
  const limit = Number(getQueryParam(req, 'limit')) || 5;

  if (title && processNumber) {
    return Response.json({
      status: 400,
      message: "You must send ONLY 'title' OR 'processNumber', not both.",
    });
  }

  let casesByQuery = null;

  const casesByClientId = fakeCases.filter((cas) => cas.clientId === clientId);

  if (title) {
    casesByQuery = filterCasesByTitle(casesByClientId, title);
  }

  if (processNumber) {
    casesByQuery = filterCasesByProcessNumber(casesByClientId, processNumber);
  }

  const cases = casesByQuery || casesByClientId;

  const pagination = {
    cases: paginate(cases, page, limit),
    page,
    limit,
    total: cases.length,
    totalPages: Math.ceil(cases.length / limit),
  };

  const response: HttpResponse = {
    status: 200,
    data: pagination,
  };
  return Response.json(response);
}
