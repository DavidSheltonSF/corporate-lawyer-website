import { fakeUserDatabase } from '../../fakeDatabase/users';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = fakeUserDatabase.find((u) => u.id === id);

  if (!user) {
    return Response.json(
      {
        success: false,
        message: 'User not found',
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      success: true,
      data: user,
    },
    { status: 200 }
  );
}
