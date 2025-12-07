import { fakeCases } from "../fakeDatabase/cases";

export async function GET(){
  return Response.json(fakeCases)
}