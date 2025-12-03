import { paginate } from '@/helpers/paginate';
import { fakeCases } from '../../fakeDatabase/cases';

export async function GET(req: Request, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;
  const { searchParams } = new URL(req.url);
  const cases = fakeCases.filter((cas) => cas.clientId === clientId);

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const response = {
    data: paginate(cases, page, limit),
    page,
    limit,
    total: cases.length,
    totalPages: Math.ceil(cases.length / limit),
  };
  return Response.json(response);
}
