import { paginate } from '@/helpers/paginate';
import { fakeCases } from '../../fakeDatabase/cases';
import { filterCasesByTitle } from '@/lib/filterCasesByTitle';
import { filterCasesByProcessNumber } from '@/lib/filterCasesByProcessNumber';
import { HttpResponse } from '@/types/HttpResponse';

export async function GET(req: Request, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title');
  const processNumber = searchParams.get('processNumber');

  if (title && processNumber) {
    return Response.json({
      status: 400,
      message: "You must send ONLY 'title' OR 'processNumber', not both.",
    });
  }

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;

  let casesByQuery = null;

  const clientCases = fakeCases.filter((cas) => cas.clientId === clientId);

  if (title) {
    casesByQuery = filterCasesByTitle(clientCases, title);
  }

  if (processNumber) {
    casesByQuery = filterCasesByProcessNumber(clientCases, processNumber);
  }

  const cases = casesByQuery || clientCases;

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
