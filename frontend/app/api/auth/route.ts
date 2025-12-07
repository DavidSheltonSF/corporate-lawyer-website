import { fakeUserDatabase } from '../fakeDatabase/users';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  const user = fakeUserDatabase.find((user) => user.email === email);

  if (!user || user.password !== password) {
    return Response.json({
      status: 401,
      message: 'Invalid email or password',
    });
  }

  const fakeToken = email + '-token';
  return Response.json({
    status: 200,
    token: fakeToken,
  });
}


export async function GET(){
  return Response.json({
    message: 'ITS WORKING'
  })
}