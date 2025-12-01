import { fakeCases } from '../../fakeDatabase/cases';

export async function GET(req: Request, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;
  const cases = fakeCases.filter((cas) => cas.clientId === clientId);

  return Response.json(cases);
}
