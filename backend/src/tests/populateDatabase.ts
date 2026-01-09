import { fakeCases } from './fakeDatabase/cases';
import { fakeUserDatabase } from './fakeDatabase/users';
import { CaseModel } from '../models/CaseModel';
import { UserModel } from '../models/UserModel';

export async function populateDatabase() {
  await UserModel.create(fakeUserDatabase);
  await CaseModel.create(fakeCases);
}
