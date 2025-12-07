import { paginate } from '@/frontend/helpers/paginate';
import { fakeCases } from '../../fakeDatabase/cases';
import { filterCasesByTitle } from '@/frontend/lib/filterCasesByTitle';
import { filterCasesByProcessNumber } from '@/frontend/lib/filterCasesByProcessNumber';
import { HttpResponse } from '@/frontend/types/HttpResponse';
import { getQueryParam } from '@/frontend/helpers/getQueryParam';
import { getCaseLawyers } from '@/frontend/app/api/helpers/getCaseLawyers';

export async function GET(req: Request, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;

  const statusQuery = getQueryParam(req, 'status');
  const titleQuery = getQueryParam(req, 'title');
  const processNumberQuery = getQueryParam(req, 'processNumber');
  const page = Number(getQueryParam(req, 'page')) || 1;
  const limit = Number(getQueryParam(req, 'limit')) || 5;

  if (titleQuery && processNumberQuery) {
    return Response.json({
      status: 400,
      message: "You must send ONLY 'title' OR 'processNumber', not both.",
    });
  }

  let casesByQuery = null;

  const casesByClientId = fakeCases.filter((cas) => cas.clientId === clientId);
  casesByQuery = casesByClientId.slice();

  if (statusQuery) {
    casesByQuery = casesByQuery.filter((cas) => cas.status === statusQuery);
  }

  if (titleQuery) {
    casesByQuery = filterCasesByTitle(casesByQuery, titleQuery);
  }

  if (processNumberQuery) {
    casesByQuery = filterCasesByProcessNumber(casesByQuery, processNumberQuery);
  }

  let cases = casesByQuery || casesByClientId;
  cases = cases.map((cas) => {
    const lawyers = getCaseLawyers(cas.lawyerIds);

    return { ...cas, lawyers };
  });

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
