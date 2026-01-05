import { fakeCases } from './fakeDatabase/cases';
import { fakeUserDatabase } from './fakeDatabase/users';
import { CaseModel } from '../models/case.model';
import { UserModel } from '../models/user.model';

export async function populateDatabase() {
  await UserModel.create(fakeUserDatabase);
  await CaseModel.create(fakeCases);
}
