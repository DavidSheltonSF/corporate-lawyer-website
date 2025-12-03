import { paginate } from '@/helpers/paginate';
import { fakeCases } from '../../fakeDatabase/cases';
import { filterCasesByTitle } from '@/lib/filterCasesByTitle';
import { filterCasesByProcessNumber } from '@/lib/filterCasesByProcessNumber';

export async function GET(req: Request, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title');
  const processNumber = searchParams.get('processNumber');

  if (title && processNumber) {
    return Response.json(
      { error: "You must send ONLY 'title' OR 'processNumber', not both." },
      { status: 400 }
    );
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

  const response = {
    data: paginate(cases, page, limit),
    page,
    limit,
    total: cases.length,
    totalPages: Math.ceil(cases.length / limit),
  };
  return Response.json({ ...response, status: 200 });
}
