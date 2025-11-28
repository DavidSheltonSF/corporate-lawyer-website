import { fakeUserDatabase } from '../fakeDatabase/users';

export function GET(request: Request) {
  const token = request.headers.get('authorization');

  if (!token) {
    return Response.json({
      status: 401,
      message: 'Token missing',
    });
  }

  const email = token.split('-')[0];

  const user = fakeUserDatabase.find((user) => user.email === email);

  return Response.json({
    status: 200,
    user
  });
}
